const fecha = document.getElementById('fecha');
const input = document.getElementById('input');
const btnAgregar = document.querySelector('#agregar');
const lista = document.getElementById('lista-tareas');

const fechaActual = new Date();

const completada = 'completada';
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
let id;
let LIST;

let data = localStorage.getItem('ToDoList');
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

fecha.innerText = fechaActual.toLocaleDateString('es', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
});

// Agregar una tarea al clicar el icono +
btnAgregar.addEventListener('click', () => {
  //console.log(input.value);
  tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
    localStorage.setItem('ToDoList', JSON.stringify(LIST));
    input.value = '';
    id++;
  }
});

// Agregar una tarea al pulsar enter
document.addEventListener('keyup', function (event) {
  if (event.key == 'Enter') {
    tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
      localStorage.setItem('ToDoList', JSON.stringify(LIST));
      input.value = '';
      id++;
    }
  }
});

//Eventos de una tarea
lista.addEventListener('click', function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;
  if (elementData === 'realizado') {
    tareaCompletada(element);
  } else if (elementData === 'eliminado') {
    tareaEliminada(element);
  }
  localStorage.setItem('ToDoList', JSON.stringify(LIST));
});

//Funciones
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }
  const REALIZADO = realizado ? check : uncheck;
  const COMPLETADA = realizado ? completada : '';
  const html = `
    <li>
      <i class="fa-regular ${REALIZADO}" data="realizado" id="${id}"></i>
      <p class="texto-tarea ${COMPLETADA}">${tarea}</p>
      <i class="fa-solid fa-trash" data="eliminado" id="${id}"></i>
    </li>
    `;
  lista.insertAdjacentHTML('beforeend', html);
}

function tareaCompletada(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector('.texto-tarea').classList.toggle(completada);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

//LocalStorage
//localStorage.setItem('NombreArchivo',JSON.stringify(elemento a guardar))

function cargarLista(DATA) {
  DATA.forEach((tarea) => {
    agregarTarea(tarea.nombre, tarea.id, tarea.realizado, tarea.eliminado);
  });
}
