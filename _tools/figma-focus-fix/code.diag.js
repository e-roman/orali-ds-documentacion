// Diagnóstico Icon button (solo lectura)
(async () => {
  try {
    const page = figma.root.children.find(p => /Buttons/.test(p.name));
    await page.loadAsync();
    const outer = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Buttons/Button/Icon');
    const base = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === '_Button base Icon');
    const L = [];
    const s = n => `${n.name} | ${Math.round(n.width)}x${Math.round(n.height)} | layout=${n.layoutMode} prim=${n.primaryAxisSizingMode} counter=${n.counterAxisSizingMode} | sizingH=${n.layoutSizingHorizontal} V=${n.layoutSizingVertical} | bound=${Object.keys(n.boundVariables||{}).join(',')}`;
    L.push('BASE set: ' + (base && base.id));
    for (const v of base.children) { L.push('  base ' + s(v)); const ic = v.children.map(c => `${c.type}:${c.name} ${Math.round(c.width)}x${Math.round(c.height)} sizing=${c.layoutSizingHorizontal}/${c.layoutSizingVertical}`); L.push('    hijos: ' + ic.join(' ; ')); }
    L.push('OUTER set: ' + (outer && outer.id) + ' variantes=' + outer.children.length);
    for (const v of outer.children.slice(0, 4)) {
      L.push('  var ' + s(v));
      const n = v.findOne(x => x.type === 'INSTANCE' && x.name === '_Button base Icon');
      if (n) { const mc = await n.getMainComponentAsync(); L.push('    nested ' + s(n) + ' | main=' + (mc && mc.name) + ' ' + Math.round(mc.width) + 'x' + Math.round(mc.height) + ' | props=' + JSON.stringify(n.componentProperties)); }
      else L.push('    sin nested; hijos: ' + v.children.map(c => c.type + ':' + c.name).join(','));
    }
    const esc = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
    figma.showUI('<pre style="font:11px/1.4 monospace;white-space:pre-wrap;margin:8px">' + esc(L.join('\n')) + '</pre>', { width: 1000, height: 640, title: 'Orali diag' });
  } catch (e) { console.error('ORALI-DIAG ERROR', e); figma.closePlugin('ERROR: ' + e.message); }
})();
