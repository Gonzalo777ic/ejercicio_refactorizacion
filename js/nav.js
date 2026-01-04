document.addEventListener('DOMContentLoaded', function() {
    // 1. Cargar Navbar (Ahora busca el placeholder)
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('./components/navbar.html')
            .then(response => response.text())
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initializeNavbar();
                initializeMobileMenu();
                initializeSearchModal();
                addDynamicStyles();
            })
            .catch(e => console.error('Error navbar:', e));
    } else {
        // Fallback opcional: Si no existe el placeholder, no hace nada (o lo inyecta al inicio si prefieres mantener la lógica antigua como respaldo)
        console.warn('No se encontró #navbar-placeholder. El menú no se cargará.');
    }

    // 2. CARGA MASIVA DE COMPONENTES
    // Busca cualquier elemento con data-component y carga su contenido
    const components = document.querySelectorAll('[data-component]');
    components.forEach(el => {
        const path = el.getAttribute('data-component');
        loadComponent(el, path);
    });

    // 3. Productos Relacionados
    const relatedPlaceholder = document.getElementById('related-products-placeholder');
    if (relatedPlaceholder) {
        const category = relatedPlaceholder.getAttribute('data-category');
        setTimeout(() => {
            if (typeof renderRelatedProducts === 'function') {
                renderRelatedProducts(category);
            }
        }, 150);
    }
});

async function loadComponent(element, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Status ${response.status}`);
        const html = await response.text();
        element.innerHTML = html;
    } catch (e) {
        console.error(`Error cargando ${path}:`, e);
        element.innerHTML = `<div class="p-4 text-red-500 text-xs border border-red-200 bg-red-50 rounded">Error: No se pudo cargar ${path}</div>`;
    }
}

// ... (Resto de funciones de UI se mantienen igual: initializeNavbar, etc.) ...
function initializeNavbar() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const icon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function() {
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.remove('hidden');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    if (closeMenuButton) closeMenuButton.addEventListener('click', closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');

    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('none');
            searchModal.classList.add('anim');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.add('none');
            document.body.style.overflow = '';
        }
    }

    if (searchButton) searchButton.addEventListener('click', openSearchModal);
    if (mobileSearchButton) mobileSearchButton.addEventListener('click', openSearchModal);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearchModal();
        });
    }
}

function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
        .anim { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .none { display: none; }
        .-translate-x-full { transform: translateX(-100%); }
        #mobile-menu { transition: transform 0.3s ease-in-out; }
        #menu-overlay { background-color: rgba(0, 0, 0, 0.5); }
    `;
    document.head.appendChild(style);
}