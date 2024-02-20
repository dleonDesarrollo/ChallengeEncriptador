window.onload = function() {
    var inputText = document.getElementById('inputText');
    var outputText = document.getElementById('outputText');
    var copyButton = document.getElementById('copyButton');
    var copyButton = document.getElementById('iconCopiar');
    var c4Row1 = document.getElementById('c3-row1');
    var c4Row2 = document.getElementById('c3-row2'); 
    var c4Row3 = document.getElementById('c3-row3'); 

    document.getElementById("inputText").focus();
    
    // Función para mostrar c2-row3 si el inputText está vacío
    function showErrorMessageIfEmpty() {
        if (inputText.value.trim() === "") {
            // Si el área de texto está vacía, mostrar c2-row3 y ocultar c2-row1 y c2-row2
            c4Row3.style.display = 'flex';
            c4Row1.style.display = 'none';
            c4Row2.style.display = 'none';
            // Vaciar el campo outputText
            outputText.value = ""; // Vaciar el campo de salida
        } else {
            // Si hay texto en el área de texto, ocultar c2-row3 y mostrar c2-row1 y c2-row2
            c4Row3.style.display = 'none';
            c4Row1.style.display = 'flex';
            c4Row2.style.display = 'flex';
        }
    }

    // Mostrar c2-row3 al cargar la página si el inputText está vacío
    showErrorMessageIfEmpty();

    // Agregar eventos input para controlar el cambio en los textarea
    inputText.addEventListener('input', showErrorMessageIfEmpty);

    copyButton.addEventListener('click', function() {
        outputText.select();
        navigator.clipboard.writeText(outputText.value)
            .then(() => {
                console.log('Texto copiado correctamente');
            })
            .catch(err => {
                console.error('Error al copiar el texto: ', err);
            });
    });
    
};

const placeholderText = "Ingrese el texto aquí...";
const inputText = document.getElementById("inputText");

let index = 0;
let writing = true; // Indica si estamos escribiendo o borrando
let interval;

function updatePlaceholder() {
    const currentText = placeholderText.substring(0, index);
    inputText.setAttribute("placeholder", currentText || "..."); // Establece los puntos suspensivos si no hay texto
    
    if (writing) {
        index++;
        if (index > placeholderText.length) {
            writing = false;
            setTimeout(() => {
                writing = false; // No permitir la escritura después de la pausa
                clearInterval(interval); // Detener el intervalo de escritura
                interval = setInterval(() => { // Comenzar el proceso de borrado
                    if (index === 0) { // Si hemos borrado todo el texto, detener el intervalo
                        clearInterval(interval);
                        setTimeout(() => { // Después de la pausa, iniciar el proceso de escritura
                            writing = true;
                            interval = setInterval(updatePlaceholder, 100);
                        }, 3000); // Pausa por 3 segundos antes de iniciar la próxima escritura
                    } else {
                        index--;
                        updatePlaceholder();
                    }
                }, 100);
            }, 3000); // Pausa por 3 segundos después de escribir todo el texto
        }
    }
}

// Iniciar la animación
interval = setInterval(updatePlaceholder, 100);


//funciones para botones ENCRIPTAR Y DESENCRIPTAR
document.getElementById("encryptButton").onclick = function() {
    var inputText = document.getElementById("inputText").value.trim().toLowerCase();
    var inputTextWithoutAccents = removerTildes(inputText);
    var outputText = encriptar(inputTextWithoutAccents);
    document.getElementById("outputText").value = outputText;
    
};

document.getElementById("decryptButton").onclick = function() {
    var inputText = document.getElementById("inputText").value.trim().toLowerCase();
    var inputTextWithoutAccents = removerTildes(inputText);
    var decryptedText = desencriptar(inputTextWithoutAccents);
    document.getElementById("outputText").value = decryptedText;
};

function encriptar(texto) {
    // Reemplazar letras según las llaves de encriptación
    texto = texto.replace(/e/g, "enter")
                 .replace(/i/g, "imes")
                 .replace(/a/g, "ai")
                 .replace(/o/g, "ober")
                 .replace(/u/g, "ufat");
    return texto;
}

function desencriptar(texto) {
    // Reemplazar las secuencias encriptadas por sus letras originales
    texto = texto.replace(/enter/g, "e")
                 .replace(/imes/g, "i")
                 .replace(/ai/g, "a")
                 .replace(/ober/g, "o")
                 .replace(/ufat/g, "u");
    return texto;
}

function removerTildes(texto) {
    // Reemplazar caracteres con tildes o acentos por su equivalente sin ellos
    var caracteresConTildes = "áéíóúü";
    var caracteresSinTildes = "aeiouu";
    for (var i = 0; i < caracteresConTildes.length; i++) {
        var regex = new RegExp(caracteresConTildes.charAt(i), "g");
        texto = texto.replace(regex, caracteresSinTildes.charAt(i));
    }
    return texto;
}

//Función para botón TRANSLATE
document.getElementById("btnTranslate").onclick = function() {
    var inputTextArea = document.getElementById("inputText");
    var outputTextArea = document.getElementById("outputText");
    
    // Remover tildes y convertir a minúsculas antes de intercambiar el texto
    inputTextArea.value = removerTildes(inputTextArea.value.toLowerCase());
    outputTextArea.value = removerTildes(outputTextArea.value.toLowerCase());
    
    var temp = inputTextArea.value;
    inputTextArea.value = outputTextArea.value;
    outputTextArea.value = temp;

    // Verificar si el texto intercambiado es encriptado o desencriptado
    if (document.getElementById("encryptButton").classList.contains("active")) {
        // Si el botón de encriptar está activo, encriptar el texto intercambiado
        var outputText = encriptar(inputTextArea.value);
        outputTextArea.value = outputText;
    } else if (document.getElementById("decryptButton").classList.contains("active")) {
        // Si el botón de desencriptar está activo, desencriptar el texto intercambiado
        var decryptedText = desencriptar(inputTextArea.value);
        outputTextArea.value = decryptedText;
    }
};

