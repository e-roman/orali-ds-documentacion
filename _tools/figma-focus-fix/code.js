// Stepper Focus v2: anillo en todo el control (como Button) + botón enfocado con stepper/bg-focus
(async () => {
  const L = [];
  try {
    const page = figma.root.children.find(p => /Inputs/.test(p.name));
    await page.loadAsync();
    const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Stepper');
    const vars = await figma.variables.getLocalVariablesAsync();
    const V = n => { const v = vars.find(x => x.name === n); if (!v) L.push('FALTA ' + n); return v; };
    const vRing = V('button/focus-ring'), vGap = V('color/surface/default'), vBgF = V('stepper/bg-focus');
    if (vBgF) {
      const mode = Object.keys(vBgF.valuesByMode)[0];
      let val = vBgF.valuesByMode[mode], chain = [vBgF.name];
      while (val && val.type === 'VARIABLE_ALIAS') { const t = await figma.variables.getVariableByIdAsync(val.id); chain.push(t ? t.name : '??'); val = t ? t.valuesByMode[Object.keys(t.valuesByMode)[0]] : null; }
      const hex = val && 'r' in val ? '#' + [val.r, val.g, val.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase() : JSON.stringify(val);
      L.push('stepper/bg-focus → ' + chain.join(' → ') + ' = ' + hex);
    }
    const shadow = (spread, v, hex) => {
      let e = { type: 'DROP_SHADOW', color: { r: 1, g: 1, b: 1, a: 1 }, offset: { x: 0, y: 0 }, radius: 0, spread, visible: true, blendMode: 'NORMAL', showShadowBehindNode: false };
      if (hex) { e.color = { r: parseInt(hex.slice(1, 3), 16) / 255, g: parseInt(hex.slice(3, 5), 16) / 255, b: parseInt(hex.slice(5, 7), 16) / 255, a: 1 }; }
      return v ? figma.variables.setBoundVariableForEffect(e, 'color', v) : e;
    };
    for (const v of set.children.filter(c => /State=Focus/.test(c.name))) {
      const box = v.findOne(n => n.name === '_input-element');
      const b = v.findOne(n => n.type === 'FRAME' && n.name === 'Button +');
      if (!box || !b) { L.push('estructura inesperada: ' + v.name); continue; }
      for (const c of [...b.children]) if (c.name === 'Focus ring') { c.locked = false; c.remove(); }
      b.strokes = [];
      b.fills = vBgF ? [figma.variables.setBoundVariableForPaint(figma.util.solidPaint('#FFE1E3'), 'color', vBgF)] : [figma.util.solidPaint('#FFE1E3')];
      // anillo exterior: hueco 2px (surface) + anillo 2px (focus-ring), sigue radio y tamaño del contenedor
      box.effects = [shadow(4, vRing, '#E30613'), shadow(2, vGap)];
      L.push(`${v.name}: contenedor ${Math.round(box.width)}x${Math.round(box.height)} con anillo · botón + con bg-focus`);
    }
  } catch (e) { L.push('ERROR: ' + e.message); }
  figma.closePlugin(L.join(' | '));
})();
