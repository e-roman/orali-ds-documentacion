// Fix Stepper: nombres de variantes, alturas por token, −/+ como frames propios, foco 2px, colores.
(async () => {
  const L = [];
  try {
    const page = figma.root.children.find(p => /Inputs/.test(p.name));
    await page.loadAsync();
    const set = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Stepper');
    const vars = await figma.variables.getLocalVariablesAsync();
    const V = n => { const v = vars.find(x => x.name === n); if (!v) L.push('FALTA variable ' + n); return v; };
    const paint = (v, hex = '#E30613') => v ? figma.variables.setBoundVariableForPaint(figma.util.solidPaint(hex), 'color', v) : figma.util.solidPaint(hex);
    const bind = (n, f, v, fallback) => { if (v) n.setBoundVariable(f, v); else if (fallback !== undefined) n[f] = fallback; };

    const vh = { sm: V('stepper/height-sm'), md: V('stepper/height'), lg: V('stepper/height-lg') };
    const vhit = { sm: V('stepper/hit-area-sm'), md: V('stepper/hit-area'), lg: V('stepper/hit-area') };
    const vRad = V('stepper/radius'), vBw = V('stepper/border-width'), vHover = V('stepper/bg-hover'), vIcon = V('stepper/icon');
    const vFg = V('stepper/fg'), vRing = V('button/focus-ring'), vRingW = V('button/focus-width'), vDis = V('button/disabled/fg'), vIco16 = V('button/size/md/icon-size');

    // 1) Nombres: Disable -> Disabled; Focus duplicado con label deshabilitado -> Disabled
    for (const v of set.children) {
      const lab = v.findOne(n => n.type === 'TEXT' && n.name === 'Label');
      const labVar = lab && lab.boundVariables && lab.boundVariables.fills && lab.boundVariables.fills[0];
      const labName = labVar ? (vars.find(x => x.id === labVar.id) || {}).name : '';
      if (/State=Disable$/.test(v.name)) v.name = v.name.replace('State=Disable', 'State=Disabled');
      else if (/State=Focus/.test(v.name) && labName === 'color/text/disabled') v.name = v.name.replace('State=Focus', 'State=Disabled');
    }

    for (const v of set.children) {
      const size = (v.name.match(/Size=(\w+)/) || [])[1];
      const state = (v.name.match(/State=(\w+)/) || [])[1];
      const box = v.findOne(n => n.name === '_input-element');
      if (!box) { L.push('sin _input-element: ' + v.name); continue; }

      // Contenedor
      box.layoutSizingVertical = 'FIXED';
      bind(box, 'height', vh[size], { sm: 32, md: 40, lg: 44 }[size]);
      for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) bind(box, k, vRad, 8);
      if (vBw) box.setBoundVariable('strokeWeight', vBw);
      box.strokesIncludedInLayout = true;
      box.paddingLeft = box.paddingRight = box.paddingTop = box.paddingBottom = 0;
      box.itemSpacing = 0;
      box.primaryAxisAlignItems = 'SPACE_BETWEEN';
      box.counterAxisAlignItems = 'CENTER';
      box.clipsContent = true;

      // Número
      const num = box.findOne(n => n.type === 'TEXT');
      if (num && state !== 'Disabled') num.fills = [paint(vFg, '#1A1A1A')];

      // −/+ : reemplazar por frames propios
      const slots = box.children.filter(c => c.type === 'INSTANCE');
      for (let i = 0; i < slots.length; i++) {
        const old = slots[i];
        const isPlus = i === slots.length - 1 && slots.length > 1;
        const oldIcon = old.findOne(n => n.type === 'INSTANCE' && /^(plus|minus)$/.test(n.name));
        const mc = oldIcon ? await oldIcon.getMainComponentAsync() : null;
        const f = figma.createFrame();
        f.name = isPlus ? 'Button +' : 'Button −';
        f.layoutMode = 'HORIZONTAL';
        f.primaryAxisAlignItems = 'CENTER'; f.counterAxisAlignItems = 'CENTER';
        f.paddingLeft = f.paddingRight = f.paddingTop = f.paddingBottom = 0;
        f.fills = [];
        const idx = box.children.indexOf(old);
        box.insertChild(idx, f);
        f.layoutSizingHorizontal = 'FIXED';
        bind(f, 'width', vhit[size], size === 'sm' ? 32 : 40);
        f.layoutSizingVertical = 'FILL';
        if (mc) {
          const ic = mc.createInstance();
          f.appendChild(ic);
          bind(ic, 'width', vIco16, 16); bind(ic, 'height', vIco16, 16);
          const col = state === 'Disabled' ? vDis : vIcon;
          for (const x of ic.findAll(n => 'strokes' in n && n.strokes.length)) x.strokes = [paint(col, state === 'Disabled' ? '#D4D4D4' : '#E30613')];
        }
        if (isPlus && state === 'Hover') f.fills = [paint(vHover, '#FFF1F2')];
        if (isPlus && state === 'Focus') {
          f.strokes = [paint(vRing)]; f.strokeAlign = 'INSIDE';
          f.strokeWeight = 2; if (vRingW) f.setBoundVariable('strokeWeight', vRingW);
        }
        old.remove();
      }
      const btns = box.children.filter(c => c.type === 'FRAME').map(b => Math.round(b.width) + 'x' + Math.round(b.height)).join(' ');
      L.push(`${v.name}: contenedor ${Math.round(box.width)}x${Math.round(box.height)} · botones ${btns}`);
    }

    // 2) Label apagado por defecto
    try {
      const defs = set.componentPropertyDefinitions;
      const key = Object.keys(defs).find(k => k.startsWith('Label'));
      if (key) { set.editComponentProperty(key, { defaultValue: false }); L.push('Label: por defecto OFF'); }
    } catch (e) { L.push('Label ERROR: ' + e.message); }
    L.push('Variantes: ' + set.children.map(c => c.name).join(' | '));
  } catch (e) { L.push('ERROR: ' + e.message + '\n' + e.stack); }
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  figma.showUI('<button id="b" style="font:16px sans-serif;padding:10px 24px;margin:8px">COPIAR</button><textarea id="t" style="width:98%;height:560px;font:11px monospace">' + esc(L.join('\n')) + '</textarea><script>document.getElementById("b").onclick=()=>{const t=document.getElementById("t");t.select();document.execCommand("copy");document.getElementById("b").textContent="COPIADO";}</script>', { width: 900, height: 640, title: 'Orali fix stepper' });
})();
