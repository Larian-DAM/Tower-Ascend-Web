const url = "https://godotsavegame-default-rtdb.firebaseio.com/users.json";

function formatearTiempo(segundosTotales) {
    const minutos = Math.floor(segundosTotales / 60);
    const segundos = Math.floor(segundosTotales % 60);
    const milesimas = Math.floor((segundosTotales % 1) * 1000);

    const mm = String(minutos).padStart(2, '0');
    const ss = String(segundos).padStart(2, '0');
    const ms = String(milesimas).padStart(3, '0');

    return `${mm}:${ss},${ms}`;
}

async function leerRanking() {
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        const tabla = document.getElementById("filas-ranking");
        tabla.innerHTML = ""; 

        if (!datos) return;

        let listaPartidas = [];
        for (let id in datos) {
            const p = datos[id];
            if (p.finished === true) {
                listaPartidas.push(p);
            }
        }

        listaPartidas.sort((a, b) => a.total_time - b.total_time);

        listaPartidas.forEach((partida, index) => {
            const fila = `
                <tr>
                    <td>${index + 1}º</td>
                    <td>${partida.username}</td>
                    <td>${formatearTiempo(partida.total_time)}</td>
                </tr>
            `;
            tabla.innerHTML += fila;
        });
    } catch (e) {
        console.error(e);
    }
}

leerRanking();