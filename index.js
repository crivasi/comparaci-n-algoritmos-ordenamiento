const divVectorGenerado = document.getElementById('vector-generado');
const radiosSizeVector = document.querySelectorAll('[name="cantElementos"]');
const btnGenerarVector = document.getElementById('generar-vector');
const btnCopiarVector = document.getElementById('copiar-vector');
const btnOrdenarVector = document.getElementById('ordenar-vector');
const mensajeVectorGenerado = document.getElementById('mensaje-vector-generado');
const mensajeVectorCopiado = document.getElementById('mensaje-vector-copiado');
const divMuestraVector = document.getElementById('muestra-vector-generado');

const colIntercambiosQuicksort = document.querySelector('#quicksort-intercambios');
const colIntercambiosHeap = document.querySelector('#heap-intercambios');

const vectorAleatorio = [];

btnGenerarVector.addEventListener('click', generarVectorAleatorio);
btnCopiarVector.addEventListener('click', copiarVectorGenerado);
btnOrdenarVector.addEventListener('click', ordenarVector);

radiosSizeVector.forEach(function (radioSize) {
  radioSize.addEventListener('change', function() {
    btnOrdenarVector.setAttribute('disabled', '');
    resetValues();
    if (mensajeVectorGenerado.classList.contains('visible')) {
      mensajeVectorGenerado.classList.remove('visible');
      mensajeVectorGenerado.classList.add('oculto');
    }
  });
});

function resetValues() {
  intercambiosHeap = 0;
  intercambiosQuicksort = 0;
}

function desaparecerMensajeCopiado() {
  setTimeout(function() {
    mensajeVectorCopiado.classList.remove('mensaje-copiado--visible'); 
  }, 1500);
}

function generarVectorAleatorio() {
  vectorAleatorio.length = 0;
  const size = parseInt(document.querySelector('[name="cantElementos"]:checked').value);
  const cifras = [9999, 99999, 999999];

  for (let i = 0; i < size; i++) {
    const numeroCifras = Math.floor(Math.random() * cifras.length);
    vectorAleatorio.push(Math.round((Math.random() * cifras[numeroCifras])) + 1000);
  }

  if (mensajeVectorGenerado.classList.contains('oculto')) {
    mensajeVectorGenerado.classList.remove('oculto');
    mensajeVectorGenerado.classList.add('visible');
  }
  
  divMuestraVector.textContent = `${JSON.stringify(vectorAleatorio).substring(0,500)}...`;
  btnOrdenarVector.removeAttribute('disabled');
}

function copiarVectorGenerado() {
  navigator.clipboard.writeText(JSON.stringify(vectorAleatorio));
  mensajeVectorCopiado.classList.toggle('mensaje-copiado--visible');
  desaparecerMensajeCopiado();
}

function ordenarVector() {
  btnOrdenarVector.setAttribute('disabled', '');

  const vectorQuicksort = [...vectorAleatorio];
  const vectorHeapsort = [...vectorAleatorio];

  quickSort(vectorQuicksort, 0, vectorQuicksort.length - 1);
  heapSort(vectorHeapsort);
  agregarDatosTabla();

  btnOrdenarVector.removeAttribute('disabled');
  
  divMuestraVector.textContent = `${JSON.stringify(vectorHeapsort).substring(0,500)}...`;
}

function agregarDatosTabla() {
  colIntercambiosQuicksort.textContent = intercambiosQuicksort;
  colIntercambiosHeap.textContent = intercambiosHeap;
}

///////////////////// HEAPSORT ///////////////
let comparacionesHeap = 0;
let intercambiosHeap = 0;

var array_length;

// A utility function to swap two elements
function swapHeap(input, index_A, index_B) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;

  intercambiosHeap += 1;
}

/* to create MAX  array */  
function heapRoot(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  if (left < array_length && input[left] > input[max]) {
    max = left;
  }

  if (right < array_length && input[right] > input[max])     {
    max = right;
  }

  if (max != i) {
    swapHeap(input, i, max);
    heapRoot(input, max);
  }
}

function heapSort(input) {
  array_length = input.length;

  for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
    heapRoot(input, i);
  }

  for (i = input.length - 1; i > 0; i--) {
      swapHeap(input, 0, i);
      array_length--;
      heapRoot(input, 0);
  }
}

/////////////////////////////


/////////// QUICKSORT ///////////////////
// A utility function to swap two elements
function swapQuickSort(input, index_A, index_B) {
  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;

  intercambiosQuicksort += 1;
}
/* This function takes last element as pivot, places
 the pivot element at its correct position in sorted
 array, and places all smaller (smaller than pivot)
 to left of pivot and all greater elements to right
 of pivot */
function partition(arr, low, high) {

  // pivot
  let pivot = arr[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {

      // If current element is smaller
      // than the pivot
      if (arr[j] < pivot) {

          // Increment index of
          // smaller element
          i++;
          swapQuickSort(arr, i, j);
      }
  }

  swapQuickSort(arr, i + 1, high);

  return (i + 1);
}

/* The main function that implements QuickSort
        arr[] --> Array to be sorted,
        low --> Starting index,
        high --> Ending index
*/

let intercambiosQuicksort = 0;

function quickSort(arr, low, high) {
  if (low < high) {

      // pi is partitioning index, arr[p]
      // is now at right place
      let pi = partition(arr, low, high);

      // Separately sort elements before
      // partition and after partition
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
  }
}

// This code is contributed by Saurabh Jaiswal