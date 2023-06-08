let h1 = document.querySelector('h1');

function sucess (pos){
    console.log(pos.coords.latitude, pos.coords.longitude);
    h1.textContent = 'Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}';
    
    var map = L.map('map').setView([-23.50,-45.12], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 22,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

}


function error (err){
    console.log(err);
}

var watchID = navigator.geolocation.watchPosition(sucess, err, {
   enableHighAccuracy: true,
   timeout: 5000 
});