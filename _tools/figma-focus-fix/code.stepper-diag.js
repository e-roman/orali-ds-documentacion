// Diagnóstico Stepper (solo lectura)
(async () => {
  const L = [];
  try {
    const page = figma.root.children.find(p => /Inputs/.test(p.name));
    await page.loadAsync();
    const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Stepper');
    const vmap = {};
    for (const v of await figma.variables.getLocalVariablesAsync()) vmap[v.id] = v.name;
    const pv = arr => (arr || []).map(p => p.type + (p.boundVariables && p.boundVariables.color ? '@' + vmap[p.boundVariables.color.id] : (p.color ? '#' + [p.color.r, p.color.g, p.color.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('') : '')) + (p.visible === false ? '(off)' : '')).join('+') || '-';
    const bv = n => Object.entries(n.boundVariables || {}).filter(([k]) => !['fills', 'strokes'].includes(k)).map(([k, v]) => k + '@' + (Array.isArray(v) ? v.map(x => vmap[x.id]).join('|') : vmap[v.id])).join(',');
    const dump = (n, d) => {
      const pad = '  '.repeat(d);
      let line = `${pad}${n.type}:${n.name} ${Math.round(n.width)}x${Math.round(n.height)}`;
      if ('layoutSizingHorizontal' in n) line += ` sz=${n.layoutSizingHorizontal}/${n.layoutSizingVertical}`;
      if ('fills' in n) line += ` F=${pv(n.fills)}`;
      if ('strokes' in n && n.strokes.length) line += ` S=${pv(n.strokes)} w=${n.strokeWeight} ${n.strokeAlign}`;
      if ('strokeLeftWeight' in n && n.strokes && n.strokes.length) line += ` sides=${n.strokeTopWeight},${n.strokeRightWeight},${n.strokeBottomWeight},${n.strokeLeftWeight}`;
      if (n.visible === false) line += ' HIDDEN';
      const b = bv(n); if (b) line += ' B=' + b;
      if (n.componentPropertyReferences) line += ' ref=' + JSON.stringify(n.componentPropertyReferences);
      L.push(line);
      if ('children' in n && d < 5) n.children.forEach(c => dump(c, d + 1));
    };
    try { L.push('SET props: ' + JSON.stringify(Object.keys(set.componentPropertyDefinitions))); } catch (e) { L.push('SET props ERROR: ' + e.message); }
    const names = set.children.map(c => c.name); L.push('VARIANTES (' + names.length + '): ' + names.join(' | '));
    const dup = names.filter((n, i) => names.indexOf(n) !== i); if (dup.length) L.push('DUPLICADAS: ' + dup.join(' | '));
    for (const v of set.children) dump(v, 0);
  } catch (e) { L.push('ERROR: ' + e.message); }
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  figma.showUI('<button id="b" style="font:16px sans-serif;padding:10px 24px;margin:8px">COPIAR</button><textarea id="t" style="width:98%;height:560px;font:10px monospace">' + esc(L.join('\n')) + '</textarea><script>document.getElementById("b").onclick=()=>{const t=document.getElementById("t");t.select();document.execCommand("copy");document.getElementById("b").textContent="COPIADO";}</script>', { width: 900, height: 640, title: 'Orali stepper diag' });
})();
