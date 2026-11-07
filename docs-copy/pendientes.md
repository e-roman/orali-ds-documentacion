# Pendientes y limitaciones conocidas (solo local)

Anotaciones que antes se mostraban en la documentación online. No se publican; se guardan acá para no perderlas.

## Componentes

- **Button**: existen tokens `button.ghost.*` pero el componente de la tienda todavía no tiene la variante `ghost`. Tampoco hay una variante destructiva.
- **Accordion**: no existe un componente `Accordion` ni tokens `accordion.*`. Hoy se escribe el markup a mano (`.accordion`, `__item`, `__trigger`, `__chevron`, `__panel`). El acordeón de la tienda todavía no es un componente React: son clases CSS que usan las FAQ y el menú mobile.
- **Icon button**: todavía no hay tokens `icon-button.*` en el repo de tokens; usa tokens semánticos.
- **Tabs**: todavía no hay tokens `tabs.*`; usa tokens semánticos.
- **Rating scale**: todavía no hay tokens `rating-scale.*`; usa tokens semánticos.
- **Card**: es una superficie genérica; el layout interno se arma con utilidades (nota que estaba en Tokens).

## Patrones

- **Modal**: no atrapa el foco ni lo devuelve al disparador al cerrar.
- **Drawer**: sin trampa de foco; el contenido de atrás no se marca como inerte.
- **Payment panel**: el logo del medio de pago es un placeholder («MP») hasta tener el asset final.
- **Historial de patrones**: no tienen historial propio; el CHANGELOG del repo de tokens solo registra tokens.

## Otros

- `components/section-index.tsx`: estado vacío «Próximamente.» (se muestra en secciones sin contenido).
