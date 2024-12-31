const API_PRODUCTS = 'https://fakestoreapi.com/products'; // API para productos
const API_MERCADOPAGO = 'https://api.mercadopago.com/v1/payment_methods'; // API MercadoPago

// Función para cargar productos desde la API
async function cargarProductos() {
  try {
      const respuesta = await fetch('https://fakestoreapi.com/products'); // API pública para productos
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

// Función para mostrar el carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoItems = document.getElementById('carrito-items');
  const totalElement = document.getElementById('total');
  carritoItems.innerHTML = '';

  let total = 0;

  carrito.forEach(producto => {
    total += producto.precio * producto.cantidad;

    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span>${producto.nombre} (x${producto.cantidad}) - $${(producto.precio * producto.cantidad).toFixed(2)}</span>
      <button class="remove-item" data-id="${producto.id}">Eliminar</button>
    `;
    carritoItems.appendChild(item);
  });

  totalElement.innerHTML = `<strong>Total: </strong>$${total.toFixed(2)}`;

  document.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', eliminarProducto));
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
  const idProducto = event.target.dataset.id;
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.id !== idProducto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Función para añadir productos a la wishlist
function agregarAWishlist(event) {
  const button = event.target;
  const idProducto = button.dataset.id;
  const nombreProducto = button.dataset.name;

  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (!wishlist.find(p => p.id === idProducto)) {
    wishlist.push({ id: idProducto, nombre: nombreProducto });
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  mostrarWishlist();
}

// Función para mostrar la wishlist
function mostrarWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const contenedorWishlist = document.getElementById('wishlist-items');
  contenedorWishlist.innerHTML = '';

  wishlist.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('wishlist-item');
    item.innerHTML = `
      <h3>${producto.nombre}</h3>
      <button class="remove-wishlist-item" data-id="${producto.id}">Eliminar</button>
    `;
    contenedorWishlist.appendChild(item);
  });

  document
    .querySelectorAll('.remove-wishlist-item')
    .forEach(button => button.addEventListener('click', eliminarDeWishlist));
}

// Función para eliminar productos de la wishlist
function eliminarDeWishlist(event) {
  const idProducto = event.target.dataset.id;
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist = wishlist.filter(producto => producto.id !== idProducto);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  mostrarWishlist();
}

// Inicializar página
function inicializarPagina() {
  cargarProductos();
  mostrarCarrito();
  mostrarWishlist();
  cargarMetodosPagoMercadoPago();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
