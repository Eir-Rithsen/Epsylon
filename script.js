const API_ENDPOINT = 'https://fakestoreapi.com/products'; // API productos
const API_PAGOS = 'https://api.example.com/pagos'; // Simulación de endpoint de métodos de pago

// Función para cargar productos
async function cargarProductos() {
  try {
    const respuesta = await fetch(API_ENDPOINT);
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

// Función para cargar métodos de pago
async function cargarMetodosPago() {
  try {
    const respuesta = await fetch(API_PAGOS);
    const metodos = await respuesta.json();
    const contenedorPagos = document.getElementById('metodos-pago');

    metodos.forEach(metodo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${metodo.logo}" alt="${metodo.nombre}">
        <h3>${metodo.nombre}</h3>
        <p>${metodo.descripcion}</p>
      `;
      contenedorPagos.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar métodos de pago:", error);
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

// Función para añadir productos al wishlist
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

// Mostrar wishlist
function mostrarWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const contenedorWishlist = document.getElementById('wishlist-items');
  contenedorWishlist.innerHTML = '';

  wishlist.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('card');
    item.innerHTML = `<h3>${producto.nombre}</h3>`;
    contenedorWishlist.appendChild(item);
  });
}

// Mostrar carrito
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const carritoItems = document.getElementById('carrito-items');
  carritoItems.innerHTML = '';

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span>${producto.nombre} (x${producto.cantidad})</span>
      <button class="remove-item" data-id="${producto.id}">Eliminar</button>
    `;
    carritoItems.appendChild(item);
  });

  document.querySelectorAll('.remove-item').forEach(button => button.addEventListener('click', eliminarProducto));
}

// Eliminar productos del carrito
function eliminarProducto(event) {
  const idProducto = event.target.dataset.id;
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(producto => producto.id !== idProducto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Inicializar página
function inicializarPagina() {
  cargarProductos();
  cargarMetodosPago();
  mostrarCarrito();
  mostrarWishlist();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);