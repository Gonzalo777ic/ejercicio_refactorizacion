document.addEventListener('DOMContentLoaded', function() {

    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        fetch('./components/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                initializeNavbar();
                initializeMobileMenu();
                initializeSearchModal();
                addDynamicStyles();
                initializeSmartNavbar();
            })
            .catch(error => {
                console.error('Error loading navbar:', error);
            });
    }


    const components = document.querySelectorAll('[data-component]');
    components.forEach(el => {
        const path = el.getAttribute('data-component');
        loadComponent(el, path);
    });


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
    if (!element || !path) return;
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = await response.text();
        element.innerHTML = html;
        
        if (path.includes('images.html') || path.includes('product-detail')) {
            setTimeout(() => {
                if (typeof initializeImageZoom === 'function') {
                    initializeImageZoom();
                }
            }, 50);
        }
    } catch (e) {
        console.error(`Error cargando ${path}:`, e);
    }
}


let isMobileMenuOpen = false;


function initializeSmartNavbar() {
    const placeholder = document.getElementById('navbar-placeholder');
    const nav = placeholder ? placeholder.querySelector('nav') : null;
    
    if (!nav || !placeholder) return;

    nav.style.position = 'fixed';
    nav.style.top = '0';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.zIndex = '50';
    nav.style.transition = 'transform 0.3s ease-in-out';
    nav.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';

    const updateSpacer = () => {
        if (nav.offsetHeight > 0) placeholder.style.height = `${nav.offsetHeight}px`;
    };

    const resizeObserver = new ResizeObserver(() => updateSpacer());
    resizeObserver.observe(nav);
    updateSpacer();

    let lastScrollTop = 0;
    const delta = 5;

    window.addEventListener('scroll', () => {
        if (isMobileMenuOpen) return;

        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (Math.abs(lastScrollTop - currentScroll) <= delta) return;

        if (currentScroll > lastScrollTop && currentScroll > nav.offsetHeight) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = currentScroll;
    }, { passive: true });
}


function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;


    if (mobileMenu.parentNode !== document.body) {
        document.body.appendChild(mobileMenu);
        if (menuOverlay) document.body.appendChild(menuOverlay);
    }

    const openMenu = () => {
        isMobileMenuOpen = true;
        
        const nav = document.querySelector('#navbar-placeholder nav');
        if (nav) nav.style.transform = 'translateY(0)';


        mobileMenu.style.visibility = 'visible';
        

        mobileMenu.classList.remove('-translate-x-full');
        if (menuOverlay) {
            menuOverlay.classList.remove('hidden');
            setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10);
        }
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        isMobileMenuOpen = false;

        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) {
            menuOverlay.classList.add('opacity-0');
            setTimeout(() => menuOverlay.classList.add('hidden'), 300);
        }
        document.body.style.overflow = '';


        setTimeout(() => {
            mobileMenu.style.visibility = 'hidden';
        }, 300);
    };

    mobileMenuButton.addEventListener('click', openMenu);
    if (closeMenuButton) closeMenuButton.addEventListener('click', closeMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
}


function initializeNavbar() {  }

function initializeSearchModal() {
    const searchModal = document.getElementById('search-modal');
    const searchButton = document.getElementById('search-button');
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const closeSearch = document.getElementById('close-search');

    if (searchModal && searchModal.parentNode !== document.body) {
        document.body.appendChild(searchModal);
    }

    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('hidden');
            searchModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.add('hidden');
            searchModal.classList.remove('flex');
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
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            .anim { animation: fadeIn 0.3s ease-in-out; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 4px; }
        `;
        document.head.appendChild(style);
    }
}