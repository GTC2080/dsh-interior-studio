"""Synthetic drawing truth sets, generated with the bundled Blender Python only."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'runtime/vendor'))
import ezdxf
root = Path(__file__).resolve().parents[1] / 'fixtures'
root.mkdir(exist_ok=True)

def home(name, unit=4, factor=1000, offset=(0,0), duplicate=False, arc=False):
    doc=ezdxf.new('R2018')
    doc.header['$INSUNITS']=unit
    for layer in ['WALL','DOOR','WINDOW','REFERENCE']: doc.layers.new(layer)
    m=doc.modelspace()
    pt=lambda x,y:(x*factor+offset[0],y*factor+offset[1])
    m.add_lwpolyline([pt(0,0),pt(6,0),pt(6,4),pt(0,4)],close=True,dxfattribs={'layer':'WALL'})
    m.add_line(pt(3,0),pt(3,4),dxfattribs={'layer':'WALL'})
    m.add_line(pt(.8,0),pt(1.7,0),dxfattribs={'layer':'DOOR'})
    m.add_line(pt(3,1.1),pt(3,2),dxfattribs={'layer':'DOOR'})
    m.add_line(pt(1,4),pt(2.5,4),dxfattribs={'layer':'WINDOW'})
    m.add_text('SYNTHETIC REFERENCE ONLY',dxfattribs={'layer':'REFERENCE','height':.1*factor})
    if duplicate:m.add_line(pt(3,0),pt(3,4),dxfattribs={'layer':'WALL'})
    if arc:m.add_arc(pt(2,2),factor,0,90,dxfattribs={'layer':'WALL'})
    doc.layout().add_text('PAPER SPACE EXCLUDED')
    doc.saveas(root/name)

home('residential-mm.dxf')
home('residential-m.dxf',6,1)
home('residential-inch.dxf',1,1/.0254)
home('residential-unitless.dxf',0)
home('residential-large-origin.dxf',offset=(1e8,2e8))
home('residential-duplicate.dxf',duplicate=True)
home('unsupported-arc.dxf',arc=True)
doc=ezdxf.new('R2018');doc.header['$INSUNITS']=6;doc.layers.new('WALL')
block=doc.blocks.new('WALL_PAIR');block.add_line((0,0),(2,0),dxfattribs={'layer':'0'})
doc.modelspace().add_blockref('WALL_PAIR',(10,20),dxfattribs={'layer':'WALL','rotation':90,'xscale':2,'yscale':2})
doc.saveas(root/'rotated-block.dxf')
(root/'truncated.dxf').write_text('0\nSECTION\n2\nENTITIES\n0\nLINE\n10\n',encoding='ascii')
print('Synthetic DXF fixtures:',len(list(root.glob('*.dxf'))))
