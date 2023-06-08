// Definir variáveis globais para os elementos do mapa
var circleLayer;
var polygonLayer;
var multipointLayer;

// Função para habilitar os elementos do mapa
function enableElements() {
    // Adicionar o marcador novamente ao mapa
    circleLayer.addTo(map);

    // Adicionar o polígono novamente ao mapa
    polygonLayer.addTo(map);

    // Adicionar os pontos multiparametro novamente ao mapa
    multipointLayer.addTo(map);
}

// Função para desabilitar os elementos do mapa
function disableElements() {
  
    // Remover o polígono do mapa
    polygonLayer.remove();

    // Remover os pontos multiparametro do mapa
    multipointLayer.remove();
}

//icone do ecoponto
const ecoponto = L.icon({
    className: 'econponto',
    iconUrl: 'container.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
})

// Criar o marcador
var EcoPonto = [-23.50199102, -45.12337474];
var circle = L.marker(EcoPonto,{icon: ecoponto})
.bindPopup('<img src= "cont_luiz.jpeg" width = "300" height = "300" >')
.openPopup();



// Criar o mapa
var map = L.map('map').setView([-23.50, -45.12], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Adicionar o marcador ao mapa
circleLayer = circle.addTo(map);

// Carregar o arquivo geoJSON do polígono
fetch('100x100.geojson')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Criar um estilo para o polígono
        var polygonStyle = {
            color: 'black',
            weight: 2,
            fillOpacity: 0.1
        };

        // Adicionar o polígono ao mapa
        polygonLayer = L.geoJSON(data, {
            style: polygonStyle
        }).addTo(map);
    });

// Carregar o arquivo geoJSON dos pontos multiparametro
fetch('multi.geojson')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Criar um estilo para os pontos
        var pointStyle = {
            color: 'black',
            weight: 2
        };

        // Adicionar os pontos ao mapa
        multipointLayer = L.geoJSON(data, {
            style: pointStyle
        }).addTo(map);
    });



// Adicionar botões para habilitar e desabilitar os elementos do mapa
var enableButton = L.control({ position: 'topright' });
var disableButton = L.control({ position: 'topright' });

enableButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Habilitar Elementos';
    button.onclick = enableElements;
    return button;
};

disableButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Desabilitar Elementos';
    button.onclick = disableElements;
    return button;
};

enableButton.addTo(map);
disableButton.addTo(map);



