const API_PRODUCTS = 'https://fakestoreapi.com/products'; // API para productos
const API_MERCADOPAGO = 'https://api.mercadopago.com/v1/payment_methods'; // API MercadoPago

// Función para cargar productos desde la API
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_PRODUCTS);
    const productos = await respuesta.json();
    const listaProductos = document.getElementById('producto-lista');

    productos.forEach(producto => {
      const card = document.createElement('div');
      card.classList.add('product-card', 'card');
      card.innerHTML = `
        <img src="${producto.image}" alt="${producto.title}">
        <h3>${producto.title}</h3>
        <p>${producto.description}</p>
        <p>$${producto.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${producto.id}" data-name="${producto.title}" data-price="${producto.price}">Añadir al carrito</button>
        <button class="add-to-wishlist" data-id="${producto.id}" data-name="${producto.title}">Añadir a Wishlist</button>
      `;
      listaProductos.appendChild(card);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => button.addEventListener('click', agregarAlCarrito));
    document.querySelectorAll('.add-to-wishlist').forEach(button => button.addEventListener('click', agregarAWishlist));
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Función para añadir productos al carrito
function agregarAlCarrito(event) {
  const button = event.target;
  const idProducto = button.dataset.id;
  const nombreProducto = button.dataset.name;
  const precioProducto = parseFloat(button.dataset.price);

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const productoExistente = carrito.find(p => p.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id: idProducto, nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Inicializar página
function inicializarPagina() {
  cargarProductos();
  mostrarCarrito();
  mostrarWishlist();
  cargarMetodosPagoMercadoPago();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);