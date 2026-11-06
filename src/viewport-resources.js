/** Each GLB owns its GPU resources and decoded images, including textures shared by its meshes. */
export function disposeModel(model) {
  const geometries=new Set(),materials=new Set(),textures=new Set(),images=new Set();
  model.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of o.material?(Array.isArray(o.material)?o.material:[o.material]):[])materials.add(m);});
  for(const m of materials)for(const value of Object.values(m))if(value?.isTexture)textures.add(value);
  for(const t of textures){if(t.image)images.add(t.image);t.dispose();}
  for(const image of images)image.close?.();
  for(const m of materials)m.dispose();for(const g of geometries)g.dispose();
}
