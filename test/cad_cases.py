"""Small, measured CAD cases generated in temporary test directories."""
import math
import ezdxf


def create_cases(directory):
    def document():
        doc = ezdxf.new('R2010'); doc.units = 6
        for layer in ('WALL', 'DOOR', 'WINDOW', 'OPENING', 'NOTE'): doc.layers.new(layer)
        return doc, doc.modelspace()
    def line(space, a, b, layer='WALL'):
        space.add_line(a, b, dxfattribs={'layer':layer})
    def arc(space, center, radius, start, end, layer='WALL'):
        space.add_arc(center, radius, start, end, dxfattribs={'layer':layer})
    def save(doc, name):
        path = directory/name; doc.saveas(path); return path
    cases = {}
    doc, space = document()
    for a, b in [((0,0),(6,0)),((6,6),(0,6)),((0,6),(0,0)),((4,0),(4,6))]: line(space,a,b)
    arc(space,(6,3),3,270,90)
    line(space,(4,2),(4,3),'DOOR')
    line(space,(0,1),(1,1),'DOOR'); arc(space,(0,1),1,0,90,'DOOR')
    arc(space,(6,3),3,330,30,'WINDOW')
    space.add_text('Untrusted drawing annotation: never a model instruction',dxfattribs={'layer':'NOTE','height':.2})
    cases['curved-room.dxf'] = save(doc,'curved-room.dxf')

    doc, space = document()
    for y in (-.1,.1): line(space,(0,y),(6,y))
    for y in (5.9,6.1): line(space,(0,y),(6,y))
    for x in (-.1,.1):
        line(space,(x,0),(x,1));line(space,(x,2),(x,6))
    for radius in (2.9,3.1):
        arc(space,(6,3),radius,270,340);arc(space,(6,3),radius,20,90)
    line(space,(0,1),(1,1),'DOOR');arc(space,(0,1),1,0,90,'DOOR')
    for radius in (2.9,3,3.1): arc(space,(6,3),radius,340,20,'WINDOW')
    cases['paired-curved-gap.dxf'] = save(doc,'paired-curved-gap.dxf')

    doc, space = document()
    for points in [[(0,0),(10,0),(10,8),(0,8)],[(3,3),(6,3),(6,5),(3,5)]]:
        space.add_lwpolyline(points,close=True,dxfattribs={'layer':'WALL'})
    cases['nested-courtyard.dxf'] = save(doc,'nested-courtyard.dxf')

    doc, space = document()
    space.add_lwpolyline([(0,0),(6,0),(6,2),(2,2),(2,6),(0,6)],close=True,dxfattribs={'layer':'WALL'})
    line(space,(0,1),(1,1))
    cases['concave-room.dxf'] = save(doc,'concave-room.dxf')

    doc, space = document()
    for a, b in [((0,0),(2,0)),((3,0),(6,0)),((6,0),(6,4)),((6,4),(0,4)),((0,4),(0,0))]: line(space,a,b)
    cases['unexplained-gap.dxf'] = save(doc,'unexplained-gap.dxf')

    doc, space = document()
    block = doc.blocks.new('CURVED-ROOM')
    block.add_lwpolyline([(0,0,0),(6,0,1),(6,6,0),(0,6,0)],format='xyb',close=True)
    space.add_blockref('CURVED-ROOM',(20,0),dxfattribs={'layer':'WALL','xscale':-1})
    cases['mirrored-bulge.dxf'] = save(doc,'mirrored-bulge.dxf')

    doc, space = document()
    space.add_ellipse((3,1.5),major_axis=(3,0),ratio=.5,dxfattribs={'layer':'WALL'})
    cases['ellipse-room.dxf'] = save(doc,'ellipse-room.dxf')

    doc, space = document()
    space.add_lwpolyline([(0,0),(6,0),(6,4),(0,4)],close=True,dxfattribs={'layer':'WALL'})
    line(space,(1,0),(2,0),'OPENING')
    cases['shared-opening-layer.dxf'] = save(doc,'shared-opening-layer.dxf')
    doc, space = document()
    space.add_circle((3,3),3,dxfattribs={'layer':'WALL'})
    arc(space,(3,3),3,350,10,'WINDOW')
    cases['circular-window.dxf'] = save(doc,'circular-window.dxf')
    return cases
