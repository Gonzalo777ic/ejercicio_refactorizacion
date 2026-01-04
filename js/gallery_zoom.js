/**
 * Lógica para la galería de imágenes, zoom y carrusel modal.
 */


let currentImageIndex = 0;

let productImages = [];

/**
 * Inicializa la lista de imágenes buscando en el DOM
 */
function initGalleryData() {


    const thumbnails = document.querySelectorAll('[onclick="toExchangeImage(this)"]');
    productImages = Array.from(thumbnails).map(img => img.src);
    

    if (productImages.length === 0) {
        const mainImg = document.getElementById('img_main');
        if (mainImg) productImages.push(mainImg.src);
    }
}

/**
 * Cambia la imagen principal en la vista de producto (sin abrir modal)
 */
function toExchangeImage(element) {
    const mainImage = document.getElementById('img_main');
    if (mainImage && element) {
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.src = element.src;
            mainImage.style.opacity = '1';
        }, 150);
        

        document.querySelectorAll('[onclick="toExchangeImage(this)"]').forEach(el => {
            el.parentElement.classList.remove('border-blue-500', 'ring-2', 'ring-blue-200');
            el.parentElement.classList.add('border-gray-200');
        });
        element.parentElement.classList.remove('border-gray-200');
        element.parentElement.classList.add('border-blue-500', 'ring-2', 'ring-blue-200');
    }
}

/**
 * Abre el modal Lightbox con la imagen actual
 */
function viewImage(src) {

    initGalleryData();
    


    currentImageIndex = productImages.findIndex(url => url === src);
    if (currentImageIndex === -1) currentImageIndex = 0;

    updateModalImage();

    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Actualiza la imagen mostrada en el modal según el índice actual
 */
function updateModalImage() {
    const modalImg = document.getElementById('modal-image');
    const counter = document.getElementById('image-counter');
    
    if (modalImg && productImages.length > 0) {

        modalImg.style.opacity = '0.5';
        setTimeout(() => {
            modalImg.src = productImages[currentImageIndex];
            modalImg.style.opacity = '1';
        }, 150);
    }

    if (counter) {
        counter.textContent = `${currentImageIndex + 1} / ${productImages.length}`;
    }
}

/**
 * Navegación: Imagen Anterior
 */
function prevImage() {
    if (productImages.length <= 1) return;
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = productImages.length - 1;
    }
    updateModalImage();
}

/**
 * Navegación: Imagen Siguiente
 */
function nextImage() {
    if (productImages.length <= 1) return;
    currentImageIndex++;
    if (currentImageIndex >= productImages.length) {
        currentImageIndex = 0;
    }
    updateModalImage();
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }
}


function initializeImageZoom() {
    const imgContainer = document.querySelector('#img_main')?.parentElement;
    const img = document.querySelector('#img_main');

    if (!imgContainer || !img) return;

    imgContainer.style.overflow = 'hidden';
    imgContainer.style.position = 'relative';
    imgContainer.style.cursor = 'zoom-in';

    imgContainer.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = imgContainer.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        img.style.transform = 'scale(2)';
    });

    imgContainer.addEventListener('mouseleave', function() {
        img.style.transformOrigin = 'center center';
        img.style.transform = 'scale(1)';
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initializeImageZoom();

    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('image-modal');
        if (modal && !modal.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeModal();
        }
    });
});


const modal = document.getElementById('image-modal');
if(modal) {
    modal.addEventListener('click', function(e) {
        if(e.target === modal) closeModal();
    });
}


window.toExchangeImage = toExchangeImage;
window.viewImage = viewImage;
window.closeModal = closeModal;
window.prevImage = prevImage;
window.nextImage = nextImage;
window.initializeImageZoom = initializeImageZoom;