var combinacionLista = false,
    pluginListo = false,
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

function dispositivoListo() {
    "use strict";

    pluginListo = true;

    if (combinacionLista) {
        navigator.splashscreen.hide();

        if (navigator && navigator.vibrate) {
            navigator.vibrate(patronVibracion);
        }
    }
}

function inicioAplicacion() {
    "use strict";

    document.addEventListener("deviceReady", dispositivoListo);
    calcularCombinacion();
}
