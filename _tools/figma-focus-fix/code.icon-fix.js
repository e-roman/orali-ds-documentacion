// Fix Icon button: Hug en variantes y anidado, sin overrides de tamaño; íconos por tamaño.
(async () => {
  const L = [];
  try {
    const page = figma.root.children.find(p => /Buttons/.test(p.name));
    await page.loadAsync();
    const outer = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === 'Buttons/Button/Icon');
    const base = page.findOne(n => n.type === 'COMPONENT_SET' && n.name === '_Button base Icon');
    const vars = await figma.variables.getLocalVariablesAsync();
    const V = n => vars.find(v => v.name === n);

    // 1) Ícono por tamaño en el base
    for (const bv of base.children) {
      const size = (bv.name.match(/Size=(\w+)/) || [])[1];
      const ic = bv.children.find(c => c.type === 'INSTANCE');
      const iv = V(`button/size/${size}/icon-size`);
      const hv = V(`button/size/${size}/height`);
      if (hv) {
        bv.primaryAxisSizingMode = 'FIXED'; bv.counterAxisSizingMode = 'FIXED';
        bv.setBoundVariable('width', hv); bv.setBoundVariable('height', hv);
        bv.primaryAxisAlignItems = 'CENTER'; bv.counterAxisAlignItems = 'CENTER';
      }
      if (ic && iv) { ic.setBoundVariable('width', iv); ic.setBoundVariable('height', iv); L.push(`base ${size}: ${Math.round(bv.width)}x${Math.round(bv.height)} (${hv ? hv.name : 'sin var alto'}) · ícono ${Math.round(ic.width)}px`); }
      else L.push(`base ${size}: sin variable de ícono (${iv ? 'ok var' : 'falta var'})`);
    }

    // 2) Snapshot/restore de color para resetear overrides de tamaño
    const snap = n => {
      const o = {};
      for (const k of ['fills', 'strokes', 'effects', 'opacity', 'visible']) if (k in n) { try { o[k] = JSON.parse(JSON.stringify(n[k])); } catch (e) {} }
      if ('children' in n) o.children = n.children.map(snap);
      return o;
    };
    const restore = (n, o) => {
      for (const k of ['fills', 'strokes', 'effects', 'opacity', 'visible']) if (o[k] !== undefined) { try { n[k] = o[k]; } catch (e) {} }
      if (o.children && 'children' in n) n.children.forEach((c, i) => o.children[i] && restore(c, o.children[i]));
    };

    let fixed = 0;
    for (const v of outer.children) {
      const n = v.findOne(x => x.type === 'INSTANCE' && x.name === '_Button base Icon');
      if (!n) { L.push('sin anidado: ' + v.name); continue; }
      const props = {};
      for (const [k, p] of Object.entries(n.componentProperties)) if (p.type === 'VARIANT' || p.type === 'INSTANCE_SWAP') props[k] = p.value;
      const s = snap(n);
      n.resetOverrides();
      restore(n, s);
      try { n.setProperties(props); } catch (e) { L.push('props ' + v.name + ': ' + e.message); }
      n.layoutSizingHorizontal = 'FIXED'; n.layoutSizingVertical = 'FIXED';
      // color del ícono según jerarquía y estado (tokens)
      const H = (v.name.match(/Hierarchy=([^,]+)/) || [])[1] || '';
      const S = (v.name.match(/State=([^,]+)/) || [])[1] || '';
      const h = H.toLowerCase();
      let vn;
      if (S === 'Disabled') vn = (h === 'link' || h === 'ghost') ? 'button/disabled/link-fg' : 'button/disabled/fg';
      else if (h === 'destructive') vn = 'color/action/destructive/fg';
      else if (S === 'Hover' && ['outline', 'link', 'ghost'].includes(h)) vn = `button/${h}/fg-hover`;
      else vn = `button/${h}/fg`;
      const fv = V(vn);
      const icon = n.children.find(c => c.type === 'INSTANCE');
      if (!fv) L.push('falta variable ' + vn);
      else if (icon) {
        for (const x of [icon, ...icon.findAll(() => true)]) {
          if (!('strokes' in x) || !Array.isArray(x.strokes) || !x.strokes.length) continue;
          x.strokes = x.strokes.map(p => p.type === 'SOLID' ? figma.variables.setBoundVariableForPaint(p, 'color', fv) : p);
        }
      }
      v.layoutSizingHorizontal = 'HUG'; v.layoutSizingVertical = 'HUG';
      fixed++;
    }
    L.push(`variantes corregidas: ${fixed}/${outer.children.length}`);

    // 3) Prueba: instancia temporal en cada tamaño
    const tv = outer.children[0];
    const inst = tv.createInstance();
    const nn = inst.findOne(x => x.type === 'INSTANCE' && x.name === '_Button base Icon');
    const sizeKey = Object.keys(nn.componentProperties).find(k => k.startsWith('Size'));
    const res = [];
    for (const sz of ['sm', 'md', 'lg', 'xl']) { nn.setProperties({ [sizeKey]: sz }); res.push(`${sz}=${Math.round(inst.width)}x${Math.round(inst.height)}`); }
    inst.remove();
    L.push('PRUEBA (' + tv.name + '): ' + res.join('  '));
  } catch (e) { L.push('ERROR: ' + e.message); }
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  figma.showUI('<pre style="font:13px/1.5 monospace;white-space:pre-wrap;margin:10px">' + esc(L.join('\n')) + '</pre>', { width: 760, height: 360, title: 'Orali fix icon' });
})();
