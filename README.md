# Ejercicio de Refactorización: Página de Producto Responsiva (Cisco/AMP)

Este repositorio contiene la solución al ejercicio técnico de desarrollo web, enfocado en la transformación de una página de producto estática heredada ("legacy") hacia una versión moderna y totalmente responsive.

## Objetivo del Ejercicio

El objetivo principal fue refactorizar la página del producto **Cable UTP AMP Categoría 6 (6-1427200-4)**, la cual originalmente no era adaptable a dispositivos móviles.  
Se utilizó como base la arquitectura existente del producto **Cisco Catalyst C9200L**, mejorando el código y la experiencia de usuario.

## Enlaces del Proyecto

- **Repositorio GitHub:**  
  https://github.com/Gonzalo777ic/ejercicio_refactorizacion

- **Demo desplegado (Vercel):**  
  [https://ejercicio-refactorizacion.vercel.app]

## Cambios y Mejoras Implementadas

Para lograr el objetivo, se realizaron las siguientes intervenciones técnicas:

### 1. Diseño Responsive (Mobile-First)

Se implementó **Tailwind CSS** para garantizar que el diseño se adapte fluidamente a cualquier tamaño de pantalla.

- **Grillas flexibles:**  
  Se migró de estructuras fijas a `grid-cols-1` para móviles y `grid-cols-12` para escritorio.

- **Adaptabilidad:**  
  El menú lateral, breadcrumbs y las galerías ahora se reorganizan automáticamente para evitar el desbordamiento horizontal en pantallas pequeñas.

### 2. Arquitectura de Componentes Modular

Se mantuvo y extendió la arquitectura de inyección de HTML mediante JavaScript (`nav.js`) para mantener el código limpio y mantenible.  
Se crearon componentes específicos para el producto AMP:

- `components/amp-summary.html`: Resumen comercial, precio ajustado y botón de compra.
- `components/amp-details.html`: Especificaciones técnicas.
- `components/amp-images.html`: Galería de imágenes interactiva.

### 3. Mejora de UX en Especificaciones Técnicas

A diferencia de la versión original plana, se implementó el patrón de diseño **Acordeón** (`<details>`) para la sección de detalles técnicos del cable AMP.

Esto permite organizar la gran cantidad de información técnica (normas, temperaturas, certificaciones) en bloques colapsables, mejorando la legibilidad y manteniendo la consistencia visual con los productos Cisco Catalyst.

### 4. Lógica de Navegación Cruzada (Cross-Selling)

Se refactorizó el archivo `js/related_products.js`.

Ahora permite navegar fluidamente entre los tres productos principales (Switch 24T, Switch 24P y Cable AMP) mediante una grilla de **Productos Relacionados** inteligente que sugiere los ítems complementarios dependiendo de la página en la que se encuentre el usuario.

### 5. Corrección de Bugs e Interacción

- **Galería modal:**  
  Se estandarizó el código del modal (z-index y eventos) en todas las páginas HTML principales para asegurar que el botón de cierre y la navegación de imágenes funcionen correctamente en cualquier dispositivo, solucionando conflictos de superposición anteriores.

- **PDFs:**  
  Se corrigieron los enlaces a las hojas de datos (datasheets) para que abran en nuevas pestañas (`target="_blank"`).

## Stack Tecnológico

- **HTML5 Semántico:** Estructura base.
- **Tailwind CSS:** Framework de utilidades para estilos responsive rápidos.
- **JavaScript (Vanilla):** Lógica de inyección de componentes y control del modal.
- **FontAwesome:** Iconografía de la interfaz.
