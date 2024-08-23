function drawMap(coords,accuracy)
{
    var map = L.map("map").setView(coords,15);
    L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
            maxZoom: 19,
        }
    ).addTo(map);
    
    var market = L.marker(coords).addTo(map);

    var circle = L.circle(coords,{
        color :"red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: accuracy
    }).addTo(map);
}

document.addEventListener("DOMContentLoaded",()=>{
    if( navigator.geolocation )
    {
        navigator.geolocation.getCurrentPosition(
            function(success){
                const { latitude , longitude , accuracy } = success.coords;
                console.log(success.coords);
                drawMap([latitude,longitude],accuracy);
            },
            (error)=>console.error(error),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }
    else alert("La geolocalizacion no esta soportada por este navegador");
});