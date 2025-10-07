// Cargar los productos desde productos.json
fetch('productos.json')
  .then(response => response.json())
  .then(data => mostrarProductos(data))
  .catch(error => console.error("Error al cargar productos:", error));

// Mostrar los productos en tarjetas
function mostrarProductos(productos) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>${prod.descripcion}</p>
      <button onclick="verDetalles('${prod.id}')">Ver detalles</button>
      <button onclick="abrirCotizacion('${prod.nombre}')">Solicitar cotización</button>
    `;
    contenedor.appendChild(card);
  });
}

// Mostrar detalles del producto (modal simple)
function verDetalles(id) {
  fetch('productos.json')
    .then(response => response.json())
    .then(data => {
      const prod = data.find(p => p.id === id);
      if (!prod) return;

      const modal = document.createElement("div");
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.background = "rgba(0,0,0,0.6)";
      modal.style.display = "flex";
      modal.style.alignItems = "center";
      modal.style.justifyContent = "center";
      modal.style.zIndex = "1000";

      modal.innerHTML = `
        <div style="background:white; padding:20px; border-radius:10px; max-width:600px; width:90%;">
          <h2>${prod.nombre}</h2>
          <p><strong>Descripción:</strong> ${prod.descripcion}</p>
          <p><strong>Coberturas:</strong> ${prod.coberturas}</p>
          <p><strong>Alcance:</strong> ${prod.alcance}</p>
          <button onclick="this.closest('div').parentNode.remove()">Cerrar</button>
        </div>
      `;

      document.body.appendChild(modal);
    });
}

// Abrir formulario con tipo de seguro seleccionado
function abrirCotizacion(nombreSeguro) {
  const select = document.getElementById("tipoSeguro");
  if (select) select.value = nombreSeguro;
  window.scrollTo({ top: document.getElementById("form-cotizacion").offsetTop, behavior: "smooth" });
}

// Manejo del formulario de cotización
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cotizacion");
  const mensaje = document.getElementById("mensajeConfirmacion");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const datos = {
      nombre: form.nombre.value,
      correo: form.correo.value,
      tipoSeguro: form.tipoSeguro.value,
      mensaje: form.mensaje.value
    };

    console.log("Datos enviados:", datos); // Solo demo, no guarda aún

    mensaje.classList.remove("oculto");
    form.reset();

    setTimeout(() => {
      mensaje.classList.add("oculto");
    }, 4000);
  });

  iniciarCarrusel();
});

// Carrusel flotante automático
function iniciarCarrusel() {
  const imagenes = [
    "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
    "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2",
    "https://images.unsplash.com/photo-1581091215367-59ab6c397b21"
  ];

  let index = 0;
  const carrusel = document.getElementById("carrusel-img");

  if (!carrusel) return;

  setInterval(() => {
    index = (index + 1) % imagenes.length;
    carrusel.src = imagenes[index];
  }, 5000);
}
