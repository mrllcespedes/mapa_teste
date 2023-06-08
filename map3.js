// Definir variáveis globais para os elementos do mapa
var markerLayer;
var polygonLayer;
var multipointLayer;
var gridLayer;
var multiLayer;

// Função para habilitar os elementos do mapa
function enableElements() {
    // Adicionar o marcador novamente ao mapa
    markerLayer.addTo(map);

    // Adicionar o polígono novamente ao mapa
    polygonLayer.addTo(map);

    // Adicionar os pontos multiparametro novamente ao mapa
    multipointLayer.addTo(map);

    // Adicionar a grade novamente ao mapa
    gridLayer.addTo(map);

    // Adicionar o item multiparametro novamente ao mapa
    multiLayer.addTo(map);
}

// Função para desabilitar os elementos do mapa
function disableElements() {
    // Remover o marcador do mapa
    markerLayer.remove();

    // Remover o polígono do mapa
    polygonLayer.remove();

    // Remover os pontos multiparametro do mapa
    multipointLayer.remove();

    // Remover a grade do mapa
    gridLayer.remove();

    // Remover o item multiparametro do mapa
    multiLayer.remove();
}

// Criar o marcador
var EcoPonto = [-23.50, -40.12];
var marker = L.marker(EcoPonto);

// Criar o mapa
var map = L.map('map').setView([-23.50, -45.12], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Adicionar o marcador ao mapa
markerLayer = marker.addTo(map);

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

// Adicionar botões para habilitar e desabilitar a grade
var enableGridButton = L.control({ position: 'topright' });
var disableGridButton = L.control({ position: 'topright' });

enableGridButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Habilitar Grade';
    button.onclick = function() {
        gridLayer.addTo(map);
    };
    return button;
};

disableGridButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Desabilitar Grade';
    button.onclick = function() {
        gridLayer.remove();
    };
    return button;
};

enableGridButton.addTo(map);
disableGridButton.addTo(map);

// Adicionar botões para habilitar e desabilitar o item multiparametro
var enableMultiButton = L.control({ position: 'topright' });
var disableMultiButton = L.control({ position: 'topright' });

enableMultiButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Habilitar Item Multi';
    button.onclick = function() {
        multiLayer.addTo(map);
    };
    return button;
};

disableMultiButton.onAdd = function(map) {
    var button = L.DomUtil.create('button');
    button.innerHTML = 'Desabilitar Item Multi';
    button.onclick = function() {
        multiLayer.remove();
    };
    return button;
};

enableMultiButton.addTo(map);
disableMultiButton.addTo(map);
