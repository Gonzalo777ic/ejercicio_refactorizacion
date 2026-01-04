const relatedProductsData = {
    "cisco-catalyst-9200": {
        title: "También Disponible: Cisco Catalyst 9200 en stock",
        products: [

            {
                id: "C9200L-24T-4G-E",
                title: "C9200L-24T-4G-E",
                desc: "Switch Cisco Catalyst 9200L Essentials C9200L-24T, capa L3 con 24 puertos Gigabit, 04 puertos para fibra SFP. (Modelo Base)",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-48T-4G-E_front.jpg", 
                link: "index.html"
            },

            {
                id: "C9200L-24P-4G-E",
                title: "C9200L-24P-4G-E",
                desc: "Switch Cisco Catalyst 9200L Essentials C9200L-24P, capa L3 con 24 puertos PoE+ (370W) Gigabit, 04 puertos para fibra SFP.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-24P-4G-E_front.jpg",
                link: "C9200L-24P-4G-E.html"
            },


            {
                id: "6-1427200-4",
                title: "Cable UTP Cat6 AMP",
                desc: "Cable Ethernet UTP Categoría 6 CommScope (AMP) 6-1427200-4, bobina de 305m, color azul. Para cableado estructurado.",
                img: "https://www.ds3comunicaciones.com/AMP/images/Caja.jpg", 
                link: "6-1427200-4.html"
            },

            {
                id: "C9200L-24T-4X-E",
                title: "C9200L-24T-4X-E",
                desc: "Switch Cisco Catalyst 9200L Essentials C9200L-24T, capa L3 con 24 puertos Gigabit, 04 puertos 10G para fibra SFP+.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-24T-4X-E_front.jpg",
                link: "#"
            },
            {
                id: "C9200L-24P-4X-E",
                title: "C9200L-24P-4X-E",
                desc: "Switch Cisco Catalyst 9200L Essentials C9200L-24P, capa L3 con 24 puertos PoE+ (370W) Gigabit, 04 puertos 10G para fibra SFP+.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-24P-4X-E_front.jpg",
                link: "#"
            },
            {
                id: "C9200L-48T-4G-E",
                title: "C9200L-48T-4G-E",
                desc: "Switch Cisco Catalyst 9200L Essentials C9200L-48T, capa L3 con 48 puertos Gigabit, 04 puertos para fibra SFP.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-48T-4G-E_front.jpg",
                link: "#"
            }
        ]
    },

    "amp-6-1427200-4": {
        title: "Productos Relacionados: Switches Compatibles",
        products: [

            {
                id: "C9200L-24T-4G-E",
                title: "Switch C9200L-24T",
                desc: "Switch Cisco Catalyst 9200L 24 Puertos Datos. Ideal para conectar con este cableado.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-48T-4G-E_front.jpg",
                link: "index.html"
            },
            {
                id: "C9200L-24P-4G-E",
                title: "Switch C9200L-24P PoE",
                desc: "Switch Cisco Catalyst 9200L 24 Puertos PoE. Soporta teléfonos y cámaras.",
                img: "https://web.netperu100.com/cisco/catalyst/images/C9200L-24P-4G-E_front.jpg",
                link: "C9200L-24P-4G-E.html"
            }
        ]
    }
};

/**
 * Renderiza el bloque de productos similares basado en una llave de categoría.
 * @param {string} categoryKey - El nombre de la categoría en relatedProductsData.
 */
function renderRelatedProducts(categoryKey) {
    const container = document.getElementById('related-products-placeholder');
    if (!container || !relatedProductsData[categoryKey]) return;

    const data = relatedProductsData[categoryKey];
    
    const html = `
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-10">
          <h2 class="text-2xl md:text-3xl font-bold text-white bg-[#049FD9] py-4 px-8 rounded-lg shadow-lg inline-block">
            ${data.title}
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          ${data.products.map(prod => `
            <a href="${prod.link}" class="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-blue-400 overflow-hidden flex flex-col">
              <div class="p-6 flex-grow flex flex-col">
                <div class="flex items-center justify-center mb-6 h-48 bg-white">
                  <img src="${prod.img}" alt="${prod.title}" onerror="this.src='https://via.placeholder.com/300x200?text=Cisco+Product'" class="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div class="border-t border-gray-50 pt-6">
                  <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">${prod.title}</h3>
                  <p class="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    ${prod.desc}
                  </p>
                </div>
              </div>
              <div class="bg-gray-50 py-3 text-center text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                Ver Detalles <i class="fas fa-arrow-right ml-2 opacity-0 group-hover:opacity-100 transition-all"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    </section>`;

    container.innerHTML = html;
}
