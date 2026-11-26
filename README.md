# JSG CARPINTERO · Demostración comercial

Propuesta independiente de web estática para una actividad de carpintería de interior de Fuenlabrada. No es una web oficial ni implica autorización del titular.

## Cómo verla
Abrir `index.html` en un navegador moderno o servir la raíz con un servidor estático. Desde la carpeta del proyecto, opcionalmente:
```bash
python -m http.server 8000
```
Abrir http://localhost:8000. No se necesita npm, compilación ni base de datos. Las imágenes de inspiración se cargan de Unsplash; si fallan, existe una ilustración local alternativa. No se utilizan fuentes remotas.

## Cloudflare Pages
1. En Workers & Pages, crear un proyecto Pages conectado al repositorio `ledo386/jsg-carpintero-web-demo`.
2. Elegir rama `main`, preset **None**, sin comando de compilación y directorio de salida `.` (raíz).
3. Guardar y desplegar; comprobar la URL generada.
4. Mantener noindex y no utilizar dominio del negocio sin autorización. Las directivas noindex no restringen el acceso público; para una presentación privada se requiere control de acceso (por ejemplo Cloudflare Access). No bloquear rastreadores en robots.txt si deben leer noindex.
También compatible con GitHub Pages desde main / root.

## Archivos
- index.html: estructura semántica, metadatos, contenido, SVG del visualizador.
- css/style.css: identidad visual, responsive, animaciones y accesibilidad.
- js/main.js: menú, scroll, filtros, diálogo, visualizador, planificador y formulario.
- assets/logo.svg y favicon.svg: emblema conceptual provisional.
- assets/fallback.svg: ilustración de reserva.
- robots.txt, _headers: control de indexación y cabeceras para Pages.
- README.md: documentación.

## Funciones
Cabecera fija, marca con retorno al inicio, menú móvil y enlaces de sección; galería de nueve referencias con filtros y ampliación mediante diálogo nativo, anterior/siguiente y teclado; visualizador SVG de puerta/armario con cuatro acabados, tres paredes, tres herrajes y dos composiciones; planificador de consulta con resumen copiable; ocho preguntas frecuentes; formulario ficticio con validación local y botón de llamada. Se respeta prefers-reduced-motion.

## Datos y límites
Fuentes consultadas:
- https://fuenlabradavirtual.com/obras-y-reformas/carpintero/ — ficha de directorio (2 valoraciones, 5,0; municipio y código postal).
- https://carpinteroscercademi.com/fuenlabrada/jsg-carpintero-fuenlabrada/ — teléfono, horario, descripción de actividad y referencias a puertas, armarios y ajustes. No se reproducen las opiniones de autenticidad incierta.
- https://unsplash.com/license — condiciones de las fotos de inspiración. No se atribuyen a JSG; las imágenes de interiores son conceptuales, no evidencia de instalaciones ni disponibilidad de materiales.
- Referencia mínima de alcance: https://github.com/ledo386/carpinteria_los_andes_demo

No se conoce año de fundación, fundador, razón social, domicilio exacto, fabricación propia, catálogo de materiales, precios, garantías ni plazos. La mención a 2025 corresponde a una referencia pública fechada, no al inicio de actividad. El proceso, materiales y visualizador son orientativos, no promesas del negocio. El logotipo requiere validación.
El formulario carece de campos con nombre y no tiene backend ni envío. Solo permite datos ficticios y los borra después de simular. No hay analítica, almacenamiento ni cookies propias. Las imágenes externas pueden implicar conexión del navegador al servidor de imágenes. Los enlaces externos y telefónicos se activan únicamente al elegirlos.

## Control de calidad
Comparación estática realizada sobre archivos recuperados de GitHub: 11 secciones frente a 9 etiquetas section de referencia; 8 FAQ frente a 4 etiquetas details de referencia; 9 tarjetas de inspiración; 2 herramientas específicas. Sin identificadores duplicados, destinos internos inexistentes ni rutas locales ausentes. JavaScript compilado sin errores de sintaxis. Breakpoints 1150, 850 y 580 px. Comprobaciones pendientes en navegador real: tamaños 1440×900, 768×1024 y 390×844; teclado, menú, galería, visualizador, formulario, copia, consola y disponibilidad de cada fotografía remota. La comprobación estática no sustituye estas pruebas.

## Antes de convertir en web oficial
Confirmar autorización y datos empresariales, obtener identidad y fotografías propias con permiso, revisar catálogo y proceso reales, sustituir textos de demostración, implementar contacto seguro si se solicita, definir aviso legal y privacidad según servicios, revisar accesibilidad, dispositivos y SEO. Retirar noindex únicamente tras autorización. No publicar la demo como web oficial.
