 // Defining the earthquake URL


let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Defining the marker
function markerSize(magnitude) {
  return (magnitude) *3;
}

// Function to determining marker color by depth

function depthColor(d) {
  return d < 5 ? "#ea2c2c" :
  d < 20 ? "#2ceabf" :
  d < 40 ? "#34eb8c" :
  d < 50 ? "#34ebba" :
  d < 60 ? "#2c99ea" :
  d < 70 ? "#d5ea2c" :
  "#ba1c1c";}

 

 // console log 

d3.json(earthquakeURL).then(function (data) {
  console.log(data);
});

// GET request to the earthquakeURL

d3.json(earthquakeURL).then(function (data) {
 

  createFeatures(data.features);
});

function createFeatures(earthquakeData) {


    function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

//   GeoJSON layer 

    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer : Markers
});

// earthquakes layer to the createMap function
    createMap(earthquakes);
 }

function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create map

  let myMap = L.map("map", {
    center: [
        36.587, -121.408
    ],
    zoom: 7,
    layers: [street, earthquakes]
  });

//  Adding layer to map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


  // Adding legend 
  var legend = L.control({position: "bottomright"});

  legend.onAdd = function(map) {
      var div = L.DomUtil.create("div", "info legend"),
      depths = [-10, 10, 30, 50, 70, 90];

      div.innerHTML += "<h3 style='text-align: center'>Depths</h3>"
      for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
        '<i style="background:' + depthColor(depths[i] + 1) + '"></i> ' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
          }
          return div;
        
  }
  legend.addTo(myMap)
}
function Markers(feature, latlng){
    let choices = {
        radius : markerSize(feature.properties.mag),
        fillColor: depthColor(feature.geometry.coordinates[1]),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
    } 
    return L.circleMarker(latlng,choices);
}

