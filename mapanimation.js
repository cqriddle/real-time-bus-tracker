mapboxgl.accessToken = 'pk.eyJ1IjoiY3FyaWRkbGUiLCJhIjoiY2w5M2V3a2lkMXRxZzN2cGNjc3d6ZWNkYSJ9.tQ9s6qlPHbsI0akxBaX93g'

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.091542,42.358862],
        zoom: 12
    });

    var marker = new mapboxgl.Marker();
marker.setLngLat([-71.092761,42.357575]);
marker.addTo(map);

async function run(){
    // get bus data    
    const locations = await getBusLocations();
    console.log(new Date());
    console.log(locations);

    let counter=0;
    for (let i = 0; i < locations.length; i++) {
    var busMarker = new mapboxgl.Marker({ color: "blue" })
      .setLngLat([
        locations[i].attributes.longitude,
        locations[i].attributes.latitude,
      ]).addTo(map);
  }

    // timer
    setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
    const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
    const response = await fetch(url);
    const json     = await response.json();
    return json.data;
}

run();