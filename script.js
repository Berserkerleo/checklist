let timer;
let isTiming = false;
let startTime;
let elapsedTime = 0;

const timerElement = document.getElementById('timer');
const startCallButton = document.getElementById('startCall');
const completeCallButton = document.getElementById('completeCall');
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.close');
const acceptButton = document.getElementById('acceptButton');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    if (isTiming) {
        elapsedTime = new Date().getTime() - startTime;
        timerElement.textContent = formatTime(elapsedTime);
    }
}

function startTimer() {
    if (!isTiming) {
        startTime = new Date().getTime() - elapsedTime;
        timer = setInterval(updateTimer, 1000);
        isTiming = true;
    }
}

function stopTimer() {
    if (isTiming) {
        clearInterval(timer);
        isTiming = false;
    }
}

function showModal() {
    const docValue = document.getElementById('doc').value;
    const officeValue = document.getElementById('office').value;

    document.getElementById('callDuration').textContent = formatTime(elapsedTime);
    document.getElementById('docValue').textContent = docValue;
    document.getElementById('officeValue').textContent = officeValue;

    modal.style.display = 'flex';
}

startCallButton.addEventListener('click', () => {
    startTimer();
});

completeCallButton.addEventListener('click', () => {
    stopTimer();
    showModal();
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

acceptButton.addEventListener('click', () => {
    modal.style.display = 'none';
    // Reset the form and timer
    document.getElementById('doc').value = '';
    document.getElementById('office').value = '';
    timerElement.textContent = '00:00:00';
    elapsedTime = 0;
});

// Restricciones de entrada
document.addEventListener('DOMContentLoaded', () => {
    const docInput = document.getElementById('doc');
    const officeInput = document.getElementById('office');
    
    // Forzar solo números en Documento
    docInput.addEventListener('input', () => {
        docInput.value = docInput.value.replace(/[^0-9]/g, '');
    });

    // Forzar solo 3 caracteres y mayúsculas en Oficina
    officeInput.addEventListener('input', () => {
        officeInput.value = officeInput.value.toUpperCase().slice(0, 3);
    });

    // Hacer lo mismo para los campos del modal
    document.getElementById('doc-item1').addEventListener('input', () => {
        document.getElementById('doc-item1').value = document.getElementById('doc-item1').value.replace(/[^0-9]/g, '');
    });

    document.getElementById('office-item1').addEventListener('input', () => {
        document.getElementById('office-item1').value = document.getElementById('office-item1').value.toUpperCase().slice(0, 3);
    });
});
