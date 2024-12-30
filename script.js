const API_MERCADOPAGO = 'https://api.mercadopago.com/v1/payment_methods'; // API MercadoPago

// Función para cargar métodos de pago desde MercadoPago
async function cargarMetodosPagoMercadoPago() {
  try {
    const respuesta = await fetch(API_MERCADOPAGO, {
      headers: {
        Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Reemplazar con el token de acceso de Mercado Pago
      },
    });
    const metodos = await respuesta.json();
    const contenedorPagos = document.getElementById('metodos-pago');

    metodos.forEach(metodo => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${metodo.thumbnail}" alt="${metodo.name}">
        <h3>${metodo.name}</h3>
      `;
      contenedorPagos.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar métodos de pago:", error);
    document.getElementById('metodos-pago').innerHTML =
      '<p>Error al cargar métodos de pago. Intente más tarde.</p>';
  }
}

// Simulador de pago
document.getElementById('form-pago').addEventListener('submit', async function (event) {
  event.preventDefault();
  const monto = document.getElementById('monto').value;
  const resultado = document.getElementById('resultado-pago');

  resultado.textContent = `El monto ingresado es: $${monto}. Simulador activo en desarrollo.`;
});

// Inicialización
function inicializarPagina() {
  cargarMetodosPagoMercadoPago();
}

document.addEventListener('DOMContentLoaded', inicializarPagina);