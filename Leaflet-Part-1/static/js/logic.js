
let myMap = L.map("map",{ 
    center:[36.587, -121.408],
    zoom:5
});


// Defining the earthquake URL
// 
// let earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Defining the marker

// L.marker([36.587, -121.408])
function markerSize(magnitude) {
    return (magnitude) *5;
  };

  // Function to determine marker color by depth
function chooseColor(depth){
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
  }
  
  function createFeatures(earthquakeData) 

  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

// // Perform a GET request to the query URL
// d3.json(earthquakeURL).then(function (data) {
//     // Console log the data retrieved 
//     console.log(data);
//     createFeatures(data.features);
// });



