function createMap(p){
  var myMap = L.map("map", {
  center:[29.8283, -98.5795],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: APIkey
}).addTo(myMap);


console.log(p)


  L.geoJson(p, {
    style: function(feature) {
      return{

      color: "white",
      fillColor: "blue",
      fillOpacity: 0.5,
      wieght: .5
    };
    },
    
    onEachFeature: function(feature, layer) {
      
     
      layer.on({
        
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.85,
            wieght: 5
          });
        },
        
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5,
            wieght: .5
          });
        },
        
    
      });
      layer.bindPopup(`<h1> ${feature.properties.NAME} Data</h1> <hr> <p> Number of Picks: ${feature.properties.baseball.picks} </p>`);
    
    }
  }).addTo(myMap);

}

function createGeoData(p){
  var link = "static/data/states_geo.json";
  var results = [];

  d3.json(link, function(data){
    results = data.features;
    
    
    // console.log(results[0].properties);
    for(var i = 0; i < results.length; i++){
      var properties = results[i].properties;
      // console.log(properties.NAME);
      Object.entries(p).forEach(([key, value])=>{
        // console.log(key)
        if (properties.NAME == key){
          properties.baseball = value;
        }
        else if(properties.NAME == "District of Columbia"){
          properties.baseball = {"firstR": 0, "picks": 0, "first": 0}
        }
      })
    
    }
    // console.log(results);
    createMap(results);
  });
    
  
};


function createYearData(year){

  stateData = [];
  d3.json("/all-data", function (data) {
 
  // console.log(data);
  data.forEach(p => {
    if(year == "all"){
      if(p.st in stateData){
        
        if(p.round == 1){
          if(p.pick == 1){
           stateData[p.st].firstR +=1;
           stateData[p.st].picks += 1;
           stateData[p.st].first += 1;
          }
          else{
           stateData[p.st].firstR +=1;
           stateData[p.st].picks += 1;
           stateData[p.st].first = stateData[p.st].first;
          }
       }
       else{
         stateData[p.st].firstR = stateData[p.st].firstR;
         stateData[p.st].first = stateData[p.st].first;
         stateData[p.st].picks += 1;
       }
     }
     else{
       
       if(p.round == 1){
          if(p.pick == 1){ 
           stateData[p.st] = {"firstR" :1, "picks" :1, "first": 1};
           
          }
          else{
           stateData[p.st] = {"firstR" :1, "picks" :1, "first": 0};
          }
       }
       else{
         stateData[p.st]= {"firstR" :0, "picks" :1, "first": 0};
         
       }
     }
    }
    else if(year == p.year){
      if(p.st in stateData){
        
        if(p.round == 1){
           if(p.pick == 1){
            stateData[p.st].firstR +=1;
            stateData[p.st].picks += 1;
            stateData[p.st].first += 1;
           }
           else{
            stateData[p.st].firstR +=1;
            stateData[p.st].picks += 1;
            stateData[p.st].first = stateData[p.st].first;
           }
        }
        else{
          stateData[p.st].firstR = stateData[p.st].firstR;
          stateData[p.st].first = stateData[p.st].first;
          stateData[p.st].picks += 1;
        }
      }
      else{
        
        if(p.round == 1){
           if(p.pick == 1){ 
            stateData[p.st] = {"firstR" :1, "picks" :1, "first": 1};
            
           }
           else{
            stateData[p.st] = {"firstR" :1, "picks" :1, "first": 0};
           }
        }
        else{
          stateData[p.st]= {"firstR" :0, "picks" :1, "first": 0};
          
        }
      }
    }
  });
  changeStates(stateData);
  });
};
function changeStates(p){
  baseballData = [];
  d3.json("/states", function (d){
    
    Object.entries(stateData).forEach(([key, value]) => {
      d.forEach(d => {
        if (d.abbr == key){
         baseballData[d.state] = value;
        }
        else{
          baseballData["Non-US"] = value;
        }
      })
    })
  });
 
  // console.log(baseballData);
  createGeoData(baseballData);
};


createYearData('all');


