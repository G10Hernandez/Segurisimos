vascript
fetch('productos.json')
.then(response => response.json())
.then(data => {
const container = document.getElementById('productos-container');
const selectSeguro = document.getElementById('seguro');


// Mostrar productos
container.innerHTML = data.productos.map(p => `
<div class="card">
<h3>${p.nombre}</h3>
<p>${p.descripcion}</p>
<strong>Cobertura:</strong>
<ul>${p.cobertura.map(c => `<li>${c}</li>`).join('')}</ul>
<p><em>${p.alcance}</em></p>
<button>Solicitar Cotización</button>
</div>
`).join('');


// Llenar select del formulario
selectSeguro.innerHTML = data.productos.map(p => `<option value="${p.nombre}">${p.nombre}</option>`).join('');
});


// Carrusel flotante
const imagenes = [
'https://images.unsplash.com/photo-1581091870622-9b6b1a2f76c4',
'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
'https://images.unsplash.com/photo-1521791136064-7986c2920216'
];


let idx = 0;
const carrusel = document.getElementById('carrusel');
const img = document.createElement('img');
img.src = imagenes[idx];
carrusel.appendChild(img);


setInterval(() => {
idx = (idx + 1) % imagenes.length;
img.src = imagenes[idx];
}, 5000);


// Formulario de cotización
const form = document.getElementById('form-cotizacion');
const mensaje = document.getElementById('mensaje-enviado');


form.addEventListener('submit', e => {
e.preventDefault();
form.reset();
mensaje.classList.remove('oculto');
setTimeout(() => mensaje.classList.add('oculto'), 4000);