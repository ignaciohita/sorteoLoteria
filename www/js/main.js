var combinacionLista = false,
    pluginListo = false,
    aceleracionAnterior,
    idMonitorizacion,
    patronVibracion = [];

function calcularCombinacion() {
    "use strict";

    var i,
        nodoNumero,
        resultados = [],
        numeroAleatorio;

    while (resultados.length < 6) {
        numeroAleatorio = Math.ceil(Math.random() * 49);

        if (resultados.indexOf(numeroAleatorio) === -1) {
            resultados.push(numeroAleatorio);
        }
    }

    resultados.sort(function (a, b) {
        return a > b;
    });

    while (document.getElementById("listaResultados").firstChild) {
        document.getElementById("listaResultados").removeChild(document.getElementById("listaResultados").firstChild);
    }

    for (i = 0; i < resultados.length; i += 1) {
        nodoNumero = document.createElement("li");
        nodoNumero.appendChild(document.createTextNode(resultados[i]));
        document.getElementById("listaResultados").appendChild(nodoNumero);

        patronVibracion.push(resultados[i] * 100);
    }

    if (pluginListo) {
        navigator.splashscreen.hide();

        if (navigator && navigator.vibrate) {
            navigator.vibrate(patronVibracion);
        }
    }

    combinacionLista = true;
}

function monitorizarAcelerometro() {
    "use strict";

    idMonitorizacion = navigator.accelerometer.watchAcceleration(function (acceleration) {
        var aceleracionActual;

        if (aceleracionAnterior !== undefined) {
            aceleracionActual = {};
            aceleracionActual.x = Math.abs(aceleracionAnterior.x - acceleration.x);
            aceleracionActual.y = Math.abs(aceleracionAnterior.y - acceleration.y);
            aceleracionActual.z = Math.abs(aceleracionAnterior.z - acceleration.z);
            aceleracionActual.total = aceleracionActual.x + aceleracionActual.y + aceleracionActual.z;
        }

        if (aceleracionActual && aceleracionActual.total > 50) {
            calcularCombinacion();
        }

        aceleracionAnterior = acceleration;
    }, undefined, {
        frequency: 300
    });
}

function liberarAcelerometro() {
    "use strict";

    navigator.accelerometer.clearWatch(idMonitorizacion);
}

function dispositivoListo() {
    "use strict";

    pluginListo = true;

    document.addEventListener("pause", liberarAcelerometro);
    document.addEventListener("resume", monitorizarAcelerometro);

    if (combinacionLista) {
        navigator.splashscreen.hide();

        if (navigator && navigator.vibrate) {
            navigator.vibrate(patronVibracion);
        }
    }

    if (navigator && navigator.accelerometer !== undefined) {
        document.getElementById("mensajeAgitado").style.display = "block";
        monitorizarAcelerometro();
    } else {
        document.getElementById("mensajeAgitado").style.display = "none";
    }
}

function inicioAplicacion() {
    "use strict";

    document.addEventListener("deviceReady", dispositivoListo);
    calcularCombinacion();
}
