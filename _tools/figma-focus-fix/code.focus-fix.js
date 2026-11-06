// Orali · Buttons/Button
// 1) Reemplaza el anillo de foco (Focus ring + Focus bounds) por un rectángulo absoluto
//    que se estira con el botón: offset 2px (button/focus-offset) + anillo 2px (button/focus-width).
// 2) Íconos: el stroke usa la misma variable que el texto de cada variante.
// 3) Limpia la descripción del set.
(async () => {
  const log = [];
  try {
    const set = await figma.getNodeByIdAsync('1038:34411');
    if (!set || set.type !== 'COMPONENT_SET') throw new Error('No encontré el set Buttons/Button (1038:34411)');

    const vars = await figma.variables.getLocalVariablesAsync();
    const byName = n => vars.find(v => v.name === n);
    const need = ['button/focus-ring', 'button/focus-width', 'button/shape/pill', 'color/focus/ring-inverse'];
    const V = {};
    for (const n of need) {
      V[n] = byName(n);
      if (!V[n]) throw new Error('Falta la variable ' + n + '. Parecidas: ' + vars.filter(v => v.name.includes(n.split('/').pop())).map(v => v.name).join(', '));
    }

    let rings = 0, icons = 0, removed = 0;
    let i = 0; const total = set.children.length;
    for (const variant of set.children) {
      if (variant.type !== 'COMPONENT') continue;
      if (++i % 25 === 0) { figma.notify(`Orali: ${i}/${total}`, { timeout: 1500 }); await new Promise(r => setTimeout(r, 0)); }
      const name = variant.name;
      const base = variant.findOne(n => n.type === 'INSTANCE' && n.name === '_Button base');

      // ---- Focus ring ----
      if (name.includes('State=Focused')) {
        const ok = variant.children.find(c => c.name === 'Focus ring' && c.type === 'RECTANGLE' && c.locked);
        if (ok) { rings++; } else {
        for (const c of [...variant.children]) if (c.name === 'Focus ring') { c.remove(); removed++; }
        variant.clipsContent = false;
        const W = variant.width, H = variant.height;
        const r = figma.createRectangle();
        r.name = 'Focus ring';
        variant.appendChild(r);
        if (variant.layoutMode && variant.layoutMode !== 'NONE') r.layoutPositioning = 'ABSOLUTE';
        r.x = -4; r.y = -4;
        r.resize(W + 8, H + 8);
        r.constraints = { horizontal: 'STRETCH', vertical: 'STRETCH' };
        r.fills = [];
        const ringVar = name.includes('Hierarchy=Inverse') ? V['color/focus/ring-inverse'] : V['button/focus-ring'];
        r.strokes = [figma.variables.setBoundVariableForPaint(figma.util.solidPaint('#E30613'), 'color', ringVar)];
        r.strokeAlign = 'INSIDE';
        r.strokeWeight = 2;
        r.setBoundVariable('strokeWeight', V['button/focus-width']);
        if (name.includes('Shape=Pill')) {
          for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) r.setBoundVariable(k, V['button/shape/pill']);
        } else {
          const br = base && typeof base.cornerRadius === 'number' ? base.cornerRadius : 8;
          r.cornerRadius = br + 4; // radio del botón + 4 (offset + anillo): concéntrico
        }
        r.locked = true;
        rings++;
        }
      }

      // ---- Íconos: stroke = variable del texto ----
      if (base) {
        const text = base.findOne(n => n.type === 'TEXT');
        const fv = text && text.boundVariables && text.boundVariables.fills && text.boundVariables.fills[0];
        if (fv) {
          const tv = await figma.variables.getVariableByIdAsync(fv.id);
          const iconRoots = base.findAll(n => /^Icon (leading|trailing)$/i.test(n.name));
          for (const ir of iconRoots) {
            const nodes = 'findAll' in ir ? [ir, ...ir.findAll(() => true)] : [ir];
            for (const n of nodes) {
              if (!('strokes' in n) || !Array.isArray(n.strokes) || !n.strokes.length) continue;
              const cur = n.boundVariables && n.boundVariables.strokes && n.boundVariables.strokes[0];
              if (cur && cur.id === tv.id) continue;
              n.strokes = n.strokes.map(p => p.type === 'SOLID' ? figma.variables.setBoundVariableForPaint(p, 'color', tv) : p);
              icons++;
            }
          }
        } else log.push('Sin variable de texto: ' + name);
      }
    }

    set.description = 'Button. Tokens: button.* (dist/tokens.css). Props: Hierarchy, State, Shape, Size. Foco: anillo 2px (button/focus-width, button/focus-ring) con offset 2px; radio del anillo = radio + 4 (excepción documentada).';

    const msg = `OK · anillos nuevos: ${rings} · anillos viejos borrados: ${removed} · strokes de íconos reasociados: ${icons}` + (log.length ? ' · avisos: ' + log.length : '');
    console.log(msg, log);
    figma.closePlugin(msg);
  } catch (e) {
    console.error(e);
    figma.closePlugin('ERROR: ' + e.message);
  }
})();
