# Foundations: textos propuestos

Para el agente de código: reemplazar `description` en `lib/nav.ts` (`foundations`) y agregar los párrafos de intro indicados en `components/foundations/views.tsx` (clase `muted`, debajo del título de cada sección). Voseo rioplatense, como el resto del sitio.

## Descripciones (tarjeta del índice y bajada de la página)

| Slug | Hoy | Propuesta |
|---|---|---|
| tokens | Primitive, semantic y component. | Las decisiones de diseño como variables, en tres capas. |
| color | Escalas, semánticos y contraste. | Paleta de marca y colores con intención: superficie, texto, acción y feedback. |
| typography | Montserrat, escalas y estilos. | Una familia, una escala de tamaños y estilos listos para usar. |
| spacing | Escala base 4 y tamaños de control. | Escala base 4 para espacios, tamaños de control y breakpoints. |
| radius | De none a full. | Esquinas rectas, suaves o totalmente redondeadas. |
| elevation | Sombras y capas. | Sombras para separar superficies del fondo. |
| layer | Escala de z-index. | El orden en que se apilan header, menús, drawers y modales. |
| motion | Duración y easing. | Cuánto dura y cómo se mueve cada transición. |
| border | Anchos y colores de borde. | Grosores y colores de borde para separar, marcar y enfocar. |

Cambio clave: "Elevation: Sombras y capas" confundía con Layer; "Color: contraste" prometía algo que la página no muestra.

## Intros por sección

**Design tokens**
- *Arquitectura en 3 capas* (antes de la tabla): "Los tokens van de lo general a lo específico. Cada capa solo lee de la anterior, así un cambio de marca se hace en un lugar y llega a todos los componentes."
- *Regla* (reemplaza "Regla: un componente nunca…"): "Un componente nunca usa un primitivo de color directo. Si falta un semántico, se crea."
- *Cómo usar*: reemplazar el bloque de código por "La instalación está explicada en [Empezar](/get-started)." (hoy está duplicada).
- *Tokens por familia*: "Cuántas variables hay en cada familia."

**Color**
- *Primitivos*: "Las escalas de la paleta, de 50 a 950. Son la materia prima: solo las usa la capa semántica."
- *Semánticos*: "Colores con intención. Son los que usan los componentes. Hacé clic en un nombre para copiar la variable."

**Tipografía**
- *Familia y pesos*: "Montserrat para todo el sitio, en cuatro pesos."
- *Estilos de texto*: "Combinan peso, tamaño, interlineado y familia. Usalos en lugar de armar cada valor a mano."
- *Escala de tamaños*: "Los tamaños base. Cada uno tiene su interlineado."
- *Interlineado*: "Alto de línea que acompaña a cada tamaño."

**Spacing**
- *Escala*: "Base de 4 px. Se usa para padding, gap y márgenes."
- *Tamaño de controles*: "Alto de botones, inputs y selects. El mínimo táctil es 44 px."
- *Contenedor y breakpoints*: "Ancho máximo del contenido y puntos donde cambia el layout."

**Radius** (hoy no tiene intro)
- "Cuanto más grande el elemento, más grande el radio. Los botones usan `md`; las cards, `lg` o `xl`; chips e íconos, `full`."

> Verificar con el código antes de publicar: qué radio usa cada componente.

**Elevation**
- *Elevación (semántico)*: "Usá estos en los componentes. Cada uno apunta a una sombra primitiva."
- *Sombras (primitivo)*: "Valores crudos. Solo los usa la capa semántica."

**Layer** (hoy sin intro útil)
- "De la capa más baja a la más alta. Usá siempre el token, nunca un z-index suelto: así un modal nunca queda detrás del header."

**Motion**
- *Duración*: "Pasá el mouse por la barra para ver el tiempo real."
- *Easing*: "La curva con la que acelera y frena el movimiento."
- *Transiciones*: "Combinaciones de duración y easing para los casos más comunes."

**Border**
- *Ancho*: "Del borde fino al de foco."
- *Color*: "Un color por función: separar, marcar un campo y enfocar."

## Pendiente de decisión (no es solo texto)

Unir Radius con Border y Elevation con Layer sigue siendo opcional. Si se hace, los títulos serían "Forma" y "Profundidad", y los textos de arriba se reutilizan tal cual como secciones.
