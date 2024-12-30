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
        <button class="add-to-cart" data-id="${producto.id}">Añadir al carrito</button>
        <button class="add-to-wishlist" data-id="${producto.id}">Añadir a Wishlist</button>
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

// Función para añadir productos al wishlist
function agregarAWishlist(event) {
  const idProducto = event.target.dataset.id;
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  if (!wishlist.includes(idProducto)) {
    wishlist.push(idProducto);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    mostrarWishlist();
  }
}

// Mostrar wishlist
function mostrarWishlist() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  const contenedorWishlist = document.getElementById('wishlist-items');
  contenedorWishlist.innerHTML = '';
  wishlist.forEach(id => {
    const item = document.createElement('div');
    item.classList.add('card');
    item.textContent = `Producto ID: ${id}`; // En un entorno real, deberías cargar más datos del producto.
    contenedorWishlist.appendChild(item);
  });
}

// Función de inicialización
function inicializarPagina() {
  cargarProductos();
  cargarMetodosPago();
  mostrarCarrito();
  mostrarWishlist();
  document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
