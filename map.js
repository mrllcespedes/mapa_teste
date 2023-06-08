//criar arquivos para inserção nos mapas.
const EcoPonto = [-23.50 , -40.12];

//craiando o mapa
var map = L.map('map').setView([-23.50,-45.12], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//craindo o pronto com geoJSON
L.marker(EcoPonto).addTo(map);

fetch('100x100.geojson')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Cria um estilo para o polígono
                var polygonStyle = {
                    color: 'black',
                    weight: 2,
                    fillOpacity: 0.1
                };

                L.geoJSON(data, {
                    style: polygonStyle
                }).addTo(map);
            });

//pontos multiparametro.
fetch('multi.geojson')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                // Cria um estilo para o polígono
                var point = {
                    color: 'black',
                    weight: 2
                };

                L.geoJSON(data, {
                    style: point
                }).addTo(map);
            });



//criando controle de variáveis.

function toggleMapElements(enabled) {
    if (enabled) {
        // Habilitar os elementos do mapa
        map.eachLayer(function(layer) {
            if (!layer.hasOwnProperty('_url')) { // Verifica se é uma camada de tile
                map.addLayer(layer);
            }
        });
    } else {
        // Desabilitar os elementos do mapa
        map.eachLayer(function(layer) {
            if (!layer.hasOwnProperty('_url')) { // Verifica se é uma camada de tile
                map.removeLayer(layer);
            }
        });
    }
}