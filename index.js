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
const colTiempoBurbuja = document.querySelector('#burbuja-tiempo');
const colIntercambiosHeap = document.querySelector('#heap-intercambios');
const colComparacionesHeap = document.querySelector('#heap-comparaciones');
const colTiempoHeapsort = document.querySelector('#heap-tiempo');
const colIntercambiosHeapMejorado = document.querySelector('#heap-mejorado-intercambios');
const colComparacionesHeapMejorado = document.querySelector('#heap-mejorado-comparaciones');
const colTiempoHeapMejorado = document.querySelector('#heap-mejorado-tiempo');

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
  tiempoBurbuja = 0;
  intercambiosHeap = 0;
  comparacionesHeap = 0;
  tiempoHeapsort = 0;
  intercambiosHeapMejorado = 0;
  comparacionesHeapMejorado = 0;
  tiempoHeapsortMejorado = 0;
}

function desaparecerMensajeCopiado() {
  setTimeout(function() {
    mensajeVectorCopiado.classList.remove('mensaje-copiado--visible'); 
  }, 1500);
}

function generarVectorAleatorio() {
  resetValues();
  agregarDatosTabla();
  vectorAleatorio.length = 0;

  const size = parseInt(document.querySelector('[name="cantElementos"]:checked').value);
  const cifras = [9999, 99999, 999999];

  for (let i = 0; i < size; i++) {
    let numeroCifras = Math.floor(Math.random() * cifras.length);
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
  navigator.clipboard.writeText(JSON.stringify(typeof vectorHeapsortMejorado != 'undefined' ? vectorHeapsortMejorado : vectorAleatorio));
  mensajeVectorCopiado.classList.toggle('mensaje-copiado--visible');
  desaparecerMensajeCopiado();
}

function ordenarVector() {
  resetValues();
  agregarDatosTabla();
  
  btnOrdenarVector.setAttribute('disabled', '');
  document.body.classList.add('ordenando');

  const vectorBurbuja = [...vectorAleatorio];
  const vectorHeapsort = [...vectorAleatorio];
  const vectorHeapsortMejorado = [...vectorAleatorio];

  setTimeout(() => {
    bubblesort(vectorBurbuja);
    heapsort(vectorHeapsort);
    heapsortEnhace(vectorHeapsortMejorado);

    agregarDatosTabla();

    btnOrdenarVector.removeAttribute('disabled');
    divMuestraVector.textContent = `${JSON.stringify(vectorHeapsortMejorado).substring(0,500)}...`;
  });
}

function agregarDatosTabla() {
  colIntercambiosBurbuja.textContent = intercambiosBurbuja;
  colComparacionesBurbuja.textContent = comparacionesBurbuja;
  colTiempoBurbuja.textContent = tiempoBurbuja;
  colIntercambiosHeap.textContent = intercambiosHeap;
  colComparacionesHeap.textContent = comparacionesHeap;
  colTiempoHeapsort.textContent = tiempoHeapsort;
  colIntercambiosHeapMejorado.textContent = intercambiosHeapMejorado;
  colComparacionesHeapMejorado.textContent = comparacionesHeapMejorado;
  colTiempoHeapMejorado.textContent = tiempoHeapsortMejorado;

  document.body.classList.remove('ordenando');
}

///////////////////// HEAPSORT ///////////////
let intercambiosHeap = 0;
let comparacionesHeap = 0;
let tiempoHeapsort = 0;

const getBigger = (data, bigger, toCompare) => {
  comparacionesHeap++;
  return data[bigger] >= data[toCompare] ? bigger : toCompare;
}
 
const maxHeapify = (data, rootIndex, length) => {
  const leftIndex = rootIndex * 2 + 1;
  const rightIndex = rootIndex * 2 + 2;
  let bigger = rootIndex;
 
  comparacionesHeap += 3;

  if (leftIndex <= length) {
    bigger = getBigger(data, bigger, leftIndex);
  }

  if (rightIndex <= length) {
    bigger = getBigger(data, bigger, rightIndex);
  }
  
  if (bigger !== rootIndex) {
    intercambiosHeap++;
    [data[rootIndex], data[bigger]] = [data[bigger], data[rootIndex]];
    maxHeapify(data, bigger, length);
  }
};
 
const heapsort = data => {
  const tiempoInicial = performance.now();
  const half = Math.floor(data.length / 2);

  for (let rootIndex = half; rootIndex >= 0; rootIndex--) {
    comparacionesHeap++;
    maxHeapify(data, rootIndex, data.length - 1);
  }
  
  for (let length = data.length - 1; length >= 0; length--) {
    intercambiosHeap++;
    [data[0], data[length]] = [data[length], data[0]];
    maxHeapify(data, 0, length - 1);
  }

  tiempoHeapsort = `${(performance.now() - tiempoInicial)} ms`;
  
  return data;
};

///////// BURBUJA ////////////
let intercambiosBurbuja = 0;
let comparacionesBurbuja = 0;
let tiempoBurbuja = 0;

function bubblesort(arr) {
  const tiempoInicial = performance.now();
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

  tiempoBurbuja = `${(performance.now() - tiempoInicial)} ms`;
  
}

/////////// HEAPSORT MEJORADO //////////////
let intercambiosHeapMejorado = 0;
let comparacionesHeapMejorado = 0;
let tiempoHeapsortMejorado = 0;

const getBiggerEnhace = (data, bigger, toCompare) => {
  comparacionesHeapMejorado++;
  return data[bigger] >= data[toCompare] ? bigger : toCompare;
}
 
const maxHeapifyEnhace = (data, rootIndex, length) => {
  const leftOneIndex = rootIndex * 3 + 1;
  const leftTwoIndex = rootIndex * 3 + 2;
  const rightOneIndex = rootIndex * 3 + 3;
  let bigger = rootIndex;
  
  comparacionesHeapMejorado += 4;

  if (leftOneIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, leftOneIndex);
  }

  if (leftTwoIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, leftTwoIndex);
  }

  if (rightOneIndex <= length) {
    bigger = getBiggerEnhace(data, bigger, rightOneIndex);
  }
  
  if (bigger !== rootIndex) {
    intercambiosHeapMejorado++;
    [data[rootIndex], data[bigger]] = [data[bigger], data[rootIndex]];
    maxHeapifyEnhace(data, bigger, length);
  }
};
 
const heapsortEnhace = data => {
  const tiempoInicial = performance.now();
  const half = Math.floor(data.length / 3);

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

  tiempoHeapsortMejorado = `${(performance.now() - tiempoInicial)} ms`;
  
  return data;
};
