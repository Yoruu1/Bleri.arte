const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#post');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#enter');

function agregarPost(Post) {
  const elemento = `
    <li>
      <p class="descripcion">${Post}</p>
      <i class="fas fa-trash de"></i>
    </li>
  `;
  lista.insertAdjacentHTML("afterbegin", elemento);

  const iconoBasura = lista.querySelector('li:first-child .fa-trash.de');
  iconoBasura.addEventListener('click', eliminarPost);
}

function eliminarPost(event) {
  const item = event.target.parentElement;
  lista.removeChild(item);
}

botonEnter.addEventListener('click', () => {
  const Post = input.value;
  if (Post) {
    agregarPost(Post);
  }
  input.value = '';
});

document.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    const Post = input.value;
    if (Post) {
      agregarPost(Post);
    }
    input.value = '';
  }
});

document.querySelectorAll('.fa-trash.de').forEach(icono => {
  icono.addEventListener('click', eliminarPost);
});

const fechaActual = new Date();

const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);

fecha.textContent = fechaActual;