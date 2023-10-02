let data = [
    {
        "audio": ["audios/sesión_Principal 8.mp3", "audios/sesión_Principal 8 2.mp3", "audios/sesión_Principal 8 3 1.mp3", "audios/sesión_Principal 8 3 2 (2).mp3"],
        "imagen": "imagenes/1.png"
    },
    {
        "audio": ["audios/sesión_Principal 16.mp3", "audios/sesión_Principal 16 1.mp3"],
        "imagen": "imagenes/2.png"
    },
    {
        "audio": ["audios/sesión_Principal 4 2.mp3", "audios/sesión_Principal 4 2.mp3"],
        "imagen": "imagenes/3.png"
    },
    {
        "audio": ["audios/sesión_principal 8 4.mp3"],
        "imagen": "imagenes/4.png"
    },
    {
        "audio": ["audios/sesión_Tapado 8.mp3", "audios/sesión_Tapado 8 1.mp3", "audios/sesión_Tapado 8 2.mp3", "audios/sesión_Tapado 8 2 1.mp3"],
        "imagen": "imagenes/5.png"
    },
    {
        "audio": ["audios/sesión_Flauta 4.mp3", "audios/sesión_Flauta 4 1.mp3", "audios/sesión_Flauta 4 2.mp3"],
        "imagen": "imagenes/6.png"
    },
    {
        "audio": ["audios/sesión_8 4", "audios/sesión_8 4 1.mp3", "audios/sesión_8 4 2.mp3"],
        "imagen": "imagenes/7.png"
    },
    {
        "audio": ["audios/sesión_8 2 prin.mp3", "audios/sesión_8 2 prin 2.mp3"],
        "imagen": "imagenes/8.png"
    },
    {
        "audio": ["audios/sesión_8 y 2 2.3.mp3", "audios/sesión_8 y 2 2.3 1.mp3"],
        "imagen": "imagenes/9.png"
    },
    {
        "audio": ["audios/sesión_Trompeta 8_1.mp3", "audios/sesión_Trompeta 8.mp3", "audios/sesión_Trompeta 8_2.mp3"],
        "imagen": "imagenes/10.png"
    },
    {
        "audio": ["audios/sesión_Corneta 1 1.mp3", "audios/sesión_Corneta.mp3", "audios/sesión_Corneta 1 1.mp3"],
        "imagen": "imagenes/11.png"
    },
    {
        "audio": ["audios/sesión_lleno 1.mp3", "audios/sesión_lleno.mp3"],
        "imagen": "imagenes/12.png"
    }
    // ... añade más elementos según necesites
];

let aciertos = 0;
let errores = 0;
let indiceActual = null;
let player = document.getElementById('player');
let primeraVez = true;
let intentoRealizado = false;
let resultadoDiv = document.getElementById('resultado');
let isPlaying = false; // Para saber si el audio está reproduciéndose
const playStopBtn = document.getElementById('playStopBtn');


let maxIntentos = data.length * 30; // Establecemos un máximo de intentos
let contadorIntentos = 0;


playStopBtn.addEventListener('click', function() {
    if (isPlaying) {
        player.pause();
    } else {
        reproducirAleatorio();
    }
});

player.addEventListener('play', function() {
    isPlaying = true;
    playStopBtn.textContent = '⏹️'; // Cambia el icono a "stop"
});

player.addEventListener('pause', function() {
    isPlaying = false;
    playStopBtn.textContent = '▶️'; // Cambia el icono a "play"
    primeraVez = true; // Esto asegura que la próxima vez que presiones play, reproducirá un audio aleatorio.
});


let llamadasReproducirAleatorio = 0;

function reproducirAleatorio() {
    llamadasReproducirAleatorio++;
    console.log(`reproducirAleatorio ha sido llamado ${llamadasReproducirAleatorio} veces.`);

    indiceActual = Math.floor(Math.random() * data.length);

    let audioArray = data[indiceActual].audio;
    let audioSeleccionadoIndex = Math.floor(Math.random() * audioArray.length);
    let audioSeleccionado = audioArray[audioSeleccionadoIndex];

    if (typeof audioSeleccionado === "string") {
        player.src = audioSeleccionado;
        console.log(`Intentando cargar el audio: ${audioSeleccionado}`);
        player.play().catch(error => {
            console.error("Error al intentar reproducir el audio:", audioSeleccionado);
        });
    } else {
        console.error("El audio seleccionado no es una cadena de texto:", audioSeleccionado);
    }

    intentoRealizado = false;
    bloqueoReproduccion = false;
}

window.onload = function() {
    console.log("window.onload iniciado.");

    let musicograma = document.getElementById('musicograma');

    data.forEach((item, index) => {
        let imagen = document.createElement('img');
        imagen.src = item.imagen;
        imagen.dataset.id = index;
        imagen.addEventListener('click', function() {
            verificar(index);
        });
        musicograma.appendChild(imagen);
    });

    player.addEventListener('play', function() {
        console.log("Evento 'play' del player detectado.");
        if (primeraVez && !bloqueoReproduccion) {
            bloqueoReproduccion = true;
            reproducirAleatorio();
            primeraVez = false;
        }
    });

    player.addEventListener('pause', function() {
        console.log("Evento 'pause' del player detectado.");
        primeraVez = true;
    });
}


function verificar(index) {
    if (player.src) {
        if (indiceActual === index) {
            resultadoDiv.innerText = '¡Correcto!';
            resultadoDiv.className = "correct";
            if (!intentoRealizado) {
                document.getElementById('aciertos').innerText = ++aciertos;
            }
        } else {
            resultadoDiv.innerText = 'Inténtalo de nuevo.';
            resultadoDiv.className = "incorrect";
            if (!intentoRealizado) {
                document.getElementById('errores').innerText = ++errores;
            }
        }
        intentoRealizado = true;
    }
}

