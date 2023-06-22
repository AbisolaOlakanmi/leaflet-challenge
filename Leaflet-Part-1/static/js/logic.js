
// let myMap = L.map("map",{ 
//     center:[36.587, -121.408],
//     zoom:5
// });


// // Defining the earthquake URL
// // 
// // let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(myMap);

// // Defining the marker

// // L.marker([36.587, -121.408])
// function markerSize(magnitude) {
//     return (magnitude) *5;
//   };

//   // Function to determine marker color by depth
// function chooseColor(depth){
//     if (depth < 10) return "#00FF00";
//     else if (depth < 30) return "greenyellow";
//     else if (depth < 50) return "yellow";
//     else if (depth < 70) return "orange";
//     else if (depth < 90) return "orangered";
//     else return "#FF0000";
//   }
  
//   function createFeatures(earthquakeData) 

//   // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

// // // Perform a GET request to the query URL
// // d3.json(earthquakeURL).then(function (data) {
// //     // Console log the data retrieved 
// //     console.log(data);
// //     createFeatures(data.features);
// // });



// // Defining the earthquake URL


let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Defining the marker
function markerSize(magnitude) {
  return (magnitude) *3;
}

// Function to determining marker color by depth

function depthColor(d) {
  return d < 5 ? "#ebd234" :
  d < 20 ? "#b4eb34" :
  d < 40 ? "#34eb8c" :
  d < 50 ? "#34ebba" :
  d < 60 ? "#349eeb" :
  d < 70 ? "#63542d" :
  "#ba1c1c";

// function chooseColor(depth) {
//     switch(true) {
//       case depth > 90:
//         return "red";
//       case depth > 70:
//         return "orangered";
//       case depth > 50:
//         return "orange";
//       case depth > 30:
//         return "gold";
//       case depth > 10:
//         return "yellow";
//       default:
//         return "lightgreen";
//     }
}
 // console log 

d3.json(earthquakeURL).then(function (data) {
  console.log(data);
});

// GET request to the earthquakeURL

d3.json(earthquakeURL).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
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

// Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
 }

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

//   adding layer to map
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
        fillColor: depthColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.7,
        color: "black",
        stroke: true,
        weight: 0.7
    } 
    return L.circleMarker(latlng,choices);
}

