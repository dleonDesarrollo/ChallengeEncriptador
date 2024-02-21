window.onload = function() {
    var inputText = document.getElementById('inputText');
    var outputText = document.getElementById('outputText');
    var copyButton = document.getElementById('copyButton');
    var c4Row1 = document.getElementById('c3-row1');
    var c4Row2 = document.getElementById('c3-row2'); 
    var c4Row3 = document.getElementById('c3-row3');
    document.getElementById("inputText").focus();
    
    function showErrorMessageIfEmpty() {
        if (inputText.value.trim() === "") {
            c4Row3.style.display = 'flex';
            c4Row1.style.display = 'none';
            c4Row2.style.display = 'none';
            outputText.value = "";
        } else {
            c4Row3.style.display = 'none';
            c4Row1.style.display = 'flex';
            c4Row2.style.display = 'flex';
        }
    }

    showErrorMessageIfEmpty();

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
let writing = true;
let interval;

function updatePlaceholder() {
    const currentText = placeholderText.substring(0, index);
    inputText.setAttribute("placeholder", currentText || "...");

    if (writing) {
        index++;
        if (index > placeholderText.length) {
            writing = false;
            setTimeout(() => {
                writing = false;
                clearInterval(interval);
                interval = setInterval(() => {
                    if (index === 0) {
                        clearInterval(interval);
                        setTimeout(() => {
                            writing = true;
                            interval = setInterval(updatePlaceholder, 100);
                        }, 3000);
                    } else {
                        index--;
                        updatePlaceholder();
                    }
                }, 100);
            }, 3000);
        }
    }
}

interval = setInterval(updatePlaceholder, 100);

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
    texto = texto.replace(/e/g, "enter")
                 .replace(/i/g, "imes")
                 .replace(/a/g, "ai")
                 .replace(/o/g, "ober")
                 .replace(/u/g, "ufat");
    return texto;
}

function desencriptar(texto) {
    texto = texto.replace(/enter/g, "e")
                 .replace(/imes/g, "i")
                 .replace(/ai/g, "a")
                 .replace(/ober/g, "o")
                 .replace(/ufat/g, "u");
    return texto;
}

function removerTildes(texto) {
    var caracteresConTildes = "áéíóúü";
    var caracteresSinTildes = "aeiouu";
    for (var i = 0; i < caracteresConTildes.length; i++) {
        var regex = new RegExp(caracteresConTildes.charAt(i), "g");
        texto = texto.replace(regex, caracteresSinTildes.charAt(i));
    }
    return texto;
}

document.getElementById("btnTranslate").onclick = function() {
    var inputTextArea = document.getElementById("inputText");
    var outputTextArea = document.getElementById("outputText");
    
    inputTextArea.value = removerTildes(inputTextArea.value.toLowerCase());
    outputTextArea.value = removerTildes(outputTextArea.value.toLowerCase());
    
    var temp = inputTextArea.value;
    inputTextArea.value = outputTextArea.value;
    outputTextArea.value = temp;

    if (document.getElementById("encryptButton").classList.contains("active")) {
        var outputText = encriptar(inputTextArea.value);
        outputTextArea.value = outputText;
    } else if (document.getElementById("decryptButton").classList.contains("active")) {
        var decryptedText = desencriptar(inputTextArea.value);
        outputTextArea.value = decryptedText;
    }
};
