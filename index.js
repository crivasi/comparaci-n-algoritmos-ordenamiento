const divVectorGenerado = document.getElementById('vector-generado');
const radiosSizeVector = document.querySelectorAll('[name="cantElementos"]');
const btnGenerarVector = document.getElementById('generar-vector');
const btnCopiarVector = document.getElementById('copiar-vector');
const btnOrdenarVector = document.getElementById('ordenar-vector');
const mensajeVectorGenerado = document.getElementById('mensaje-vector-generado');
const mensajeVectorCopiado = document.getElementById('mensaje-vector-copiado');
const divMuestraVector = document.getElementById('muestra-vector-generado');

const colIntercambiosBurbuja = document.querySelector('#burbuja-intercambios');
const colComparacionesBurbuja = document.querySelector('#burbuja-comparaciones');
const colIntercambiosHeap = document.querySelector('#heap-intercambios');
const colComparacionesHeap = document.querySelector('#heap-comparaciones');
const colIntercambiosHeap2 = document.querySelector('#heap-intercambios2');
const colComparacionesHeap2 = document.querySelector('#heap-comparaciones2');
const colIntercambiosHeapMejorado = document.querySelector('#heap-mejorado-intercambios');
const colComparacionesHeapMejorado = document.querySelector('#heap-mejorado-comparaciones');

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
  intercambiosBurbuja = 0;
  comparacionesBurbuja = 0;
  intercambiosHeap = 0;
  comparacionesHeap = 0;
  intercambiosHeap2 = 0;
  comparacionesHeap2 = 0;
  intercambiosHeapMejorado = 0;
  comparacionesHeapMejorado = 0;
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
  resetValues();
  btnOrdenarVector.setAttribute('disabled', '');

  const vectorBurbuja = [...vectorAleatorio];
  const vectorHeapsort = [...vectorAleatorio];
  const vectorHeapsort2 = [...vectorAleatorio];
  const vectorHeapsortMejorado = [...vectorAleatorio];

  bubbleSort(vectorBurbuja);
  heapSort(vectorHeapsort);

  heapsort2(vectorHeapsort2);
  heapsortEnhace(vectorHeapsortMejorado);

  agregarDatosTabla();

  btnOrdenarVector.removeAttribute('disabled');

  divMuestraVector.textContent = `${JSON.stringify(vectorHeapsortMejorado).substring(0,500)}...`;
}

function agregarDatosTabla() {
  colIntercambiosBurbuja.textContent = intercambiosBurbuja;
  colComparacionesBurbuja.textContent = comparacionesBurbuja;
  colIntercambiosHeap.textContent = intercambiosHeap;
  colComparacionesHeap.textContent = comparacionesHeap;
  colIntercambiosHeap2.textContent = intercambiosHeap2;
  colComparacionesHeap2.textContent = comparacionesHeap2;
  colIntercambiosHeapMejorado.textContent = intercambiosHeapMejorado;
  colComparacionesHeapMejorado.textContent = comparacionesHeapMejorado;
}

///////////////////// HEAPSORT ///////////////
let intercambiosHeap2 = 0;
let comparacionesHeap2 = 0;

const getBigger = (data, bigger, toCompare) => {
  comparacionesHeap2++;
  return data[bigger] >= data[toCompare] ? bigger : toCompare;
}
 
const maxHeapify = (data, rootIndex, length) => {
  const leftIndex = rootIndex * 2 + 1;
  const rightIndex = rootIndex * 2 + 2;
  let bigger = rootIndex;
 
  comparacionesHeap2 += 3;

  if (leftIndex <= length) {
    bigger = getBigger(data, bigger, leftIndex);
  }

  if (rightIndex <= length) {
    bigger = getBigger(data, bigger, rightIndex);
  }
  
  if (bigger !== rootIndex) {
    intercambiosHeap2++;
    [data[rootIndex], data[bigger]] = [data[bigger], data[rootIndex]];
    maxHeapify(data, bigger, length);
  }
};
 
const heapsort2 = data => {
  const half = Math.floor(data.length / 2);
  for (let rootIndex = half; rootIndex >= 0; rootIndex--) {
    comparacionesHeap2++;
    maxHeapify(data, rootIndex, data.length - 1);
  }
  
  for (let length = data.length - 1; length >= 0; length--) {
    intercambiosHeap2++;
    [data[0], data[length]] = [data[length], data[0]];
    maxHeapify(data, 0, length - 1);
  }
  
  return data;
};

//////////

var array_length;

// A utility function to swap two elements
function swapHeap(input, index_A, index_B) {
  intercambiosHeap++;

  var temp = input[index_A];

  input[index_A] = input[index_B];
  input[index_B] = temp;
}

/* to create MAX  array */  
function heapRoot(input, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;

  comparacionesHeap += 5;

  if (left < array_length && input[left] > input[max]) {
    max = left;
  }

  if (right < array_length && input[right] > input[max]) {
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
    comparacionesHeap++;
    heapRoot(input, i);
  }

  for (i = input.length - 1; i > 0; i--) {
    comparacionesHeap++;

    swapHeap(input, 0, i);
    array_length--;
    heapRoot(input, 0);
  }
}

/////////////////////////////

///////// BURBUJA ////////////
let intercambiosBurbuja = 0;
let comparacionesBurbuja = 0;

function bubbleSort(arr) {
  const length = arr.length;  
  for (let i = 0; i < length; i++) {
    comparacionesBurbuja++;

    for (let j = 0; j < (length - i - 1); j++) {
      comparacionesBurbuja++;

      if(arr[j] > arr[j+1]) {
        const tmp = arr[j]; 
        intercambiosBurbuja++;

        arr[j] = arr[j+1]; 
        arr[j+1] = tmp; 
      }
    }        
  }
}

/////////// HEAPSORT MEJORADO //////////////
let intercambiosHeapMejorado = 0;
let comparacionesHeapMejorado = 0;

const getBiggerEnhace = (data, bigger, toCompare) => {
  comparacionesHeapMejorado++;
  return data[bigger] >= data[toCompare] ? bigger : toCompare;
}
 
const maxHeapifyEnhace = (data, rootIndex, length) => {
  const leftOneIndex = rootIndex * 4 + 1;
  const leftTwoIndex = rootIndex * 4 + 2;
  const rightOneIndex = rootIndex * 4 + 3;
  const rightTwoIndex = rootIndex * 4 + 4;
  let bigger = rootIndex;
  
  comparacionesHeapMejorado += 5;

  if (leftOneIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, leftOneIndex);
  }

  if (leftTwoIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, leftTwoIndex);
  }

  if (rightOneIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, rightOneIndex);
  }

  if (rightTwoIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, rightTwoIndex);
  }
  
  if (bigger !== rootIndex) {
    intercambiosHeapMejorado++;
    [data[rootIndex], data[bigger]] = [data[bigger], data[rootIndex]];
    maxHeapifyEnhace(data, bigger, length);
  }
};
 
const heapsortEnhace = data => {
  const half = Math.floor(data.length / 4);
  for (let rootIndex = half; rootIndex >= 0; rootIndex--) {
    comparacionesHeapMejorado++;
    maxHeapifyEnhace(data, rootIndex, data.length - 1);
  }
  
  for (let length = data.length - 1; length >= 0; length--) {
    comparacionesHeapMejorado++;
    intercambiosHeapMejorado++;
    [data[0], data[length]] = [data[length], data[0]];
    maxHeapifyEnhace(data, 0, length - 1);
  }
  
  return data;
};
