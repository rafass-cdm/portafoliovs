// FOTOS FAVORITAS - Primero (solo las que existen actualmente)
const fotosFavoritas = [398,397,395,393,390,387,376,375,363,362,359,353,342,316,304,302,289,288,266,263,262,257,243,211,209,183,178,175,173,172,171,153,147,141,129,120,113,102,98,97,95,87,84,83,82,79,76,63,62,55,46,42,30,21,20,16,9,3,27,26];

// Fotos eliminadas (para filtrar)
const fotosEliminadas = [32,65,89,86,146,145,149,148,151,158,166,167,179,194,198,244,246,247,265,273,282,290,293,298,301,303,305,307,314,315,323,328,339,366,384,388,399,409,410,411,421,424,429,438];

// Generar todas las fotos disponibles
const todasLasFotos = Array.from({ length: 443 }, (_, i) => i + 1)
    .filter(num => !fotosEliminadas.includes(num));

// Separar favoritas del resto
const fotosResto = todasLasFotos.filter(num => !fotosFavoritas.includes(num));

// Combinar: primero favoritas, luego el resto
const fotosOrdenadas = [...fotosFavoritas.filter(f => todasLasFotos.includes(f)), ...fotosResto];

// INVERTIR EL ORDEN COMPLETO
const fotosOrdenadas_Invertidas = fotosOrdenadas.reverse();

// Generar nombres
const imageNames = fotosOrdenadas_Invertidas.map(num => 'photo-' + String(num).padStart(3, '0'));

// Rutas de imágenes
const imageFolder = 'assets/images/';

// Array de imágenes
let images = [];
let currentIndex = 0;

// Elementos del DOM
const gallery = document.querySelector('.gallery-container');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const currentCounter = document.querySelector('.lightbox-counter .current');
const totalCounter = document.querySelector('.lightbox-counter .total');

// Menu elementos
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Inicializar galería
function initGallery() {
    images = imageNames.map(name => ({
        src: imageFolder + name + '.jpg',
        alt: name
    }));
    
    totalCounter.textContent = images.length;
    renderGallery();
    attachEventListeners();
    setupHamburgerMenu();
}

// Renderizar galería
function renderGallery() {
    gallery.innerHTML = '';
    images.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${image.src}" alt="${image.alt}" loading="lazy">`;
        item.addEventListener('click', () => openLightbox(index));
        gallery.appendChild(item);
    });
}

// Abrir lightbox
function openLightbox(index) {
    currentIndex = index;
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
    changeDynamicBackground(index);
}

// Cerrar lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    resetBackground();
}

// Actualizar imagen del lightbox
function updateLightboxImage() {
    lightboxImage.src = images[currentIndex].src;
    lightboxImage.alt = images[currentIndex].alt;
    currentCounter.textContent = currentIndex + 1;
}

// Cambiar fondo dinámico según color de la foto
function changeDynamicBackground(index) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 1, 1);
        const imageData = ctx.getImageData(0, 0, 1, 1).data;
        
        // Obtener color promedio desvanecido oscuro
        const r = Math.floor(imageData[0] * 0.3);
        const g = Math.floor(imageData[1] * 0.3);
        const b = Math.floor(imageData[2] * 0.3);
        
        document.body.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.15)`;
    };
    img.onerror = () => {
        // Si hay error, usar color por defecto
        document.body.style.backgroundColor = 'rgba(138, 154, 134, 0.15)';
    };
    img.src = images[index].src;
}

// Resetear fondo a original
function resetBackground() {
    document.body.style.backgroundColor = 'var(--color-light)';
}

// Navegar a siguiente imagen
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightboxImage();
    changeDynamicBackground(currentIndex);
}

// Navegar a imagen anterior
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightboxImage();
    changeDynamicBackground(currentIndex);
}

// Adjuntar event listeners
function attachEventListeners() {
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // Cerrar lightbox al hacer click en el fondo
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Controles de teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });
}

// Setup menú hamburguesa
function setupHamburgerMenu() {
    if (!hamburger) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menu al hacer click en un link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ========== Obtener Color Dominante ==========
function getDominantColorFromImage(imageElement) {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext('2d');
        
        // Dibujar imagen en canvas
        ctx.drawImage(imageElement, 0, 0, 50, 50);
        
        // Obtener pixel central para color dominante
        const imageData = ctx.getImageData(25, 25, 1, 1);
        return {
            r: imageData.data[0],
            g: imageData.data[1],
            b: imageData.data[2]
        };
    } catch (e) {
        return { r: 138, g: 154, b: 134 }; // Verde default
    }
}

// ========== Ordenar Galería por Color ==========
function sortGalleryByColor() {
    const items = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Crear array con índices y colores
    const itemsWithColors = items.map((item, idx) => {
        const img = item.querySelector('img');
        if (!img.complete) {
            return { item, idx, h: idx }; // Si no cargó, usar índice
        }
        const color = getDominantColorFromImage(img);
        const { h } = rgbToHsv(color.r, color.g, color.b);
        return { item, idx, h };
    });
    
    // Ordenar por matiz (hue) para agrupar colores similares
    itemsWithColors.sort((a, b) => a.h - b.h);
    
    // Reordenar en el DOM
    const container = document.querySelector('.gallery-container');
    itemsWithColors.forEach(({ item }) => {
        container.appendChild(item);
    });
}

// ========== Convertir RGB a HSV ==========
function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const v = max;
    
    const d = max - min;
    s = max === 0 ? 0 : d / max;
    
    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return { h: h * 360, s, v };
}

// Smooth scroll para links de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Actualizar enlace activo en navbar
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Initializar cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initGallery();
});

// Lazy loading observador
const observerOptions = {
    threshold: 0.1,
    rootMargin: '10px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, observerOptions);

// Observar imágenes
window.addEventListener('load', () => {
    document.querySelectorAll('img[data-src]').forEach(img => {
        observer.observe(img);
    });
});
