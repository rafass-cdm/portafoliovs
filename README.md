# 📸 Portafolio de Fotos - Profesional y Moderno

## ✨ Características

- ✅ **Grid Responsivo** - Se adapta a cualquier pantalla (móvil, tablet, desktop)
- ✅ **125 Fotos Organizadas** - Con carga automática y lazy loading
- ✅ **Lightbox Interactivo** - Navegación con flechas, teclado y mouse
- ✅ **Diseño Tierra** - Colores naturales (marrón, beige, crema) profesionales
- ✅ **Tipografía Premium** - Playfair Display + Lora (elegante y legible)
- ✅ **Animaciones Suaves** - Efectos hover, transiciones fluidas
- ✅ **Totalmente Funcional** - Sin dependencias externas (vanilla JavaScript)

## 🎨 Paleta de Colores

- **Marrón Principal**: `#8b7355` - Elegancia tierra
- **Beige Dorado**: `#d4a574` - Calidez y profesionalidad
- **Beige Claro**: `#c9a876` - Acentos suaves
- **Marrón Oscuro**: `#3d2817` - Textos y contrastes
- **Crema**: `#f5f1e8` - Fondo suave

## 📁 Estructura del Proyecto

```
portafoliovs/
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos CSS (con variables y grid)
├── script.js           # Funcionalidad JavaScript
├── README.md           # Este archivo
└── assets/
    └── images/         # 125 fotos (photo-01.jpg a photo-125.jpg)
```

## 🚀 Características Principales

### 1. **Grid Dinámico**
- Se reorganiza automáticamente según la pantalla
- 4 columnas en desktop, 3 en tablet, 2 en móvil, 1 en muy pequeño
- Espaciado automático y proporcional

### 2. **Lightbox Modal**
- Click en cualquier foto abre vista ampliada
- Navegación:
  - ⬅️ **Flecha Izquierda** - Foto anterior
  - ➡️ **Flecha Derecha** - Foto siguiente
  - **ESC** - Cerrar
  - **Click en fondo negro** - Cerrar
- Contador de fotos (actual / total)

### 3. **Diseño Responsivo**
- **Mobile First** - Optimizado para móviles primero
- **Breakpoints**:
  - `< 480px` - 1 columna
  - `480px - 768px` - 2 columnas
  - `768px - 1024px` - 3 columnas
  - `> 1024px` - 4 columnas

### 4. **Secciones Incluidas**
- 🎯 **Header Sticky** - Navegación siempre visible
- 🌟 **Hero Section** - Presentación impactante
- 🖼️ **Galería** - Grid de 125 fotos
- 📝 **About** - Acerca del portafolio
- 📞 **Contact** - Información de contacto
- 👣 **Footer** - Pie de página

## 🎯 Cómo Usar

### Abrir en el Navegador
1. Abre `index.html` en tu navegador favorito
2. ¡Listo! El portafolio está completamente funcional

### Agregar Más Fotos
1. Coloca las nuevas imágenes en `assets/images/`
2. Nómbralas como `photo-126.jpg`, `photo-127.jpg`, etc.
3. Actualiza el número máximo en `script.js`:
   ```javascript
   const imageNames = Array.from({ length: 150 }, (_, i) => 
       'photo-' + String(i + 1).padStart(2, '0')
   );
   ```

### Personalizar Colores
Edita las variables en `styles.css` (líneas 1-10):
```css
:root {
    --color-primary: #8b7355;        /* Marrón tierra principal */
    --color-secondary: #d4a574;      /* Beige dorado */
    /* ... más colores ... */
}
```

### Personalizar Textos
- **Header**: Edita `<h1>Portafolio</h1>` en `index.html`
- **Hero Title**: Edita `<h2>Historias Capturadas</h2>`
- **Subtítulos**: Edita los `<p>` correspondientes

## 💻 Deployment (Subir Online)

### Opción 1: **Netlify** (Gratuito y Fácil)
```bash
1. Ve a https://app.netlify.com
2. Sube la carpeta 'portafoliovs'
3. ¡Listo! Tu portafolio está online
```

### Opción 2: **GitHub Pages** (Gratuito)
```bash
1. Crea repositorio en GitHub
2. Sube los archivos
3. Ve a Settings → Pages → Branch: main
4. ¡Accesible en tu-usuario.github.io/portafoliovs
```

### Opción 3: **Vercel** (Recomendado)
```bash
1. Ve a https://vercel.com
2. Conecta tu repositorio
3. Deploy automático a cada cambio
```

## 🔧 Personalización Avanzada

### Agregar Filtros de Categorías
Si quieres agregar categorías (retratos, paisajes, etc.):
```javascript
// En script.js, agregar categorías
const imageData = [
    { src: 'photo-01.jpg', category: 'retrato' },
    { src: 'photo-02.jpg', category: 'paisaje' },
    // ...
];
```

### Agregar Descripciones a Fotos
```javascript
const imageData = [
    { src: 'photo-01.jpg', alt: 'Retrato en estudio', desc: 'Sesión fotográfica' },
    // ...
];
```

### Integrar Formulario de Contacto
Usa servicios como:
- **Formspree** - `https://formspree.io`
- **Netlify Forms** - Incluido en Netlify
- **EmailJS** - Envío desde JavaScript

## 📱 Testing en Dispositivos

### Chrome DevTools
1. Abre DevTools (`F12` o `Ctrl+Shift+I`)
2. Click en icono de responsive design
3. Prueba en diferentes dispositivos

### Responsive Devices
- 📱 iPhone 12/13/14 (390px)
- 📱 Pixel 6 (412px)
- 📱 iPad Mini (768px)
- 🖥️ Desktop (1920px+)

## ✅ Checklist de Personalización

- [ ] Cambiar nombre/título en navegación
- [ ] Actualizar enlace de contacto (email o formulario)
- [ ] Agregar redes sociales en footer
- [ ] Personalizar colores si es necesario
- [ ] Agregar favicon personalizado
- [ ] Verificar todas las fotos cargan correctamente
- [ ] Probar en móvil y desktop
- [ ] Subir a un servidor/hosting

## 🎓 Tecnologías Usadas

- **HTML5** - Semántica moderna
- **CSS3** - Grid, Flexbox, Variables CSS, Animaciones
- **JavaScript ES6** - Vanilla (sin frameworks)
- **Responsive Design** - Mobile-first approach
- **Web Fonts** - Google Fonts (Playfair Display, Lora)

## 📝 Notas Importantes

1. **Lazy Loading** - Las imágenes se cargan conforme se necesitan
2. **Accesibilidad** - Soporta navegación por teclado
3. **SEO** - Estructura semántica HTML5
4. **Performance** - Optimizado para carga rápida
5. **Cross-browser** - Compatible con Chrome, Firefox, Safari, Edge

## 🆘 Troubleshooting

### Las fotos no aparecen
- Verifica que la carpeta `assets/images/` exista
- Confirma que las imágenes tienen extensión `.jpg`
- Verifica los nombres: `photo-01.jpg`, `photo-02.jpg`, etc.

### El lightbox no funciona
- Asegúrate de que `script.js` esté cargado
- Abre la consola (`F12`) para ver errores

### Estilos no se ven
- Limpia la caché del navegador (`Ctrl+Shift+Del`)
- Verifica que `styles.css` esté en la carpeta raíz

## 🚀 Próximos Pasos

1. **Subir a GitHub** - Para control de versiones
2. **Deploy a Netlify/Vercel** - Para acceso público
3. **Agregar más secciones** - Blog, testimonios, etc.
4. **SEO Optimization** - Meta tags, sitemap.xml
5. **Analytics** - Google Analytics para trackear visitas

---

**Creado**: 2026-06-18  
**Tecnología**: HTML5 + CSS3 + JavaScript Vanilla  
**Fotos**: 125 imágenes profesionales

¡Disfruta tu portafolio! 📸✨
