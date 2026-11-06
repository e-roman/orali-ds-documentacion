// Stepper Focus: anillo interior redondeado (2px, inset 4, radius/md)
(async () => {
  const L = [];
  try {
    const page = figma.root.children.find(p => /Inputs/.test(p.name));
    await page.loadAsync();
    const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Stepper');
    const vars = await figma.variables.getLocalVariablesAsync();
    const V = n => { const v = vars.find(x => x.name === n); if (!v) L.push('FALTA ' + n); return v; };
    const vRing = V('button/focus-ring'), vW = V('button/focus-width'), vRad = V('radius/md');
    for (const v of set.children.filter(c => /State=Focus/.test(c.name))) {
      const b = v.findOne(n => n.type === 'FRAME' && n.name === 'Button +');
      if (!b) { L.push('sin Button +: ' + v.name); continue; }
      b.strokes = [];
      for (const c of [...b.children]) if (c.name === 'Focus ring') c.remove();
      b.clipsContent = false;
      const r = figma.createRectangle();
      r.name = 'Focus ring';
      b.appendChild(r);
      r.layoutPositioning = 'ABSOLUTE';
      r.x = 4; r.y = 4;
      r.resize(b.width - 8, b.height - 8);
      r.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
      r.fills = [];
      r.strokes = [vRing ? figma.variables.setBoundVariableForPaint(figma.util.solidPaint('#E30613'), 'color', vRing) : figma.util.solidPaint('#E30613')];
      r.strokeAlign = 'INSIDE';
      r.strokeWeight = 2; if (vW) r.setBoundVariable('strokeWeight', vW);
      for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) { if (vRad) r.setBoundVariable(k, vRad); else r[k] = 8; }
      r.locked = true;
      L.push(`${v.name}: botón ${Math.round(b.width)}x${Math.round(b.height)} · anillo ${Math.round(r.width)}x${Math.round(r.height)}`);
    }
  } catch (e) { L.push('ERROR: ' + e.message); }
  figma.closePlugin(L.join(' | '));
})();
