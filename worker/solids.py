# SPDX-License-Identifier: GPL-3.0-or-later
"""Closed profile extrusion shared by DXF, Blender meshes and dimensional audits."""
import math
from collections import Counter
from ezdxf.math.triangulation import mapbox_earcut_2d


def signed_area(ring):
    return sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(ring,ring[1:]+ring[:1]))/2


def rotate(point, angles):
    out=list(point)
    for axis,angle in enumerate(angles):
        c,s=math.cos(angle),math.sin(angle);i,j=(axis+1)%3,(axis+2)%3;x,y=out[i],out[j]
        out[i],out[j]=x*c-y*s,x*s+y*c
    return out


def world_point(item, point):
    u,v,n=point
    local=(u,v,n) if item['plane']=='xy' else (u,n,v) if item['plane']=='xz' else (n,u,v)
    return [a+b for a,b in zip(rotate(local,item['rotationEuler']),item['position'])]


def extrusion_data(item, world=False):
    rings=[list(item['outline'])]+[list(h) for h in item['holes']]
    rings=[ring if (signed_area(ring)>0)==(i==0) else list(reversed(ring)) for i,ring in enumerate(rings)]
    points=[p for ring in rings for p in ring];size=len(points);depth=item['depth']
    if size>24000:raise ValueError('Component mesh exceeds vertex budget')
    indices={tuple(p):i for i,p in enumerate(points)}
    vertices=[list(p)+[z] for z in (0,depth) for p in points];faces=[]
    triangles=mapbox_earcut_2d(rings[0],rings[1:])
    for tri in triangles:
        points2=[tuple(p) for p in tri]
        if signed_area(points2)<0:points2.reverse()
        face=tuple(indices[p] for p in points2)
        faces.extend([tuple(reversed(face)),tuple(i+size for i in face)])
    offset=0
    for ring in rings:
        for index in range(len(ring)):
            a,b=offset+index,offset+(index+1)%len(ring);faces.append((a,b,b+size,a+size))
        offset+=len(ring)
    edges=Counter(tuple(sorted((a,b))) for face in faces for a,b in zip(face,face[1:]+face[:1]))
    if not edges or any(count!=2 for count in edges.values()):raise ValueError('Component extrusion is not a closed manifold: '+item['label'])
    if world:
        vertices=[world_point(item,p) for p in vertices]
    else:
        vertices=[p if item['plane']=='xy' else [p[0],p[2],p[1]] if item['plane']=='xz' else [p[2],p[0],p[1]] for p in vertices]
    if item['plane']=='xz':faces=[tuple(reversed(face)) for face in faces]
    return vertices,faces


def expected_bounds(item):
    points=[world_point(item,[*p,n]) for p in item['outline'] for n in (0,item['depth'])]
    return [[fn(p[i] for p in points) for i in range(3)] for fn in (min,max)]
