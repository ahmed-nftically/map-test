var map;
var lyrOSM;   
var lyrData;
var rdata

$(document).ready(function () {
    
    var bounds = [
        [3.596071171598486, 59.26464842283168],
        [3.1710940615573904, 60.22869871580043]
      ];
    // create map object 
    // map = L.map('map_div',  {center:[ 3.483005247000051 ,59.795307280000031], zoom:12, zoomControl:true });
      map= L.map('map_div', {
        preferCanvas: true, // recommended when loading large layers.
        center: new L.LatLng(3.3706,59.7447),
        zoom: 14,
        minZoom:11,
        maxZoom:17,
        maxBounds: bounds,
        attributionControl:false,
        zoomControl:true
    });

    //add basemap layer
    lyrOSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'); 
    //  map.addLayer(lyrOSM);
 
	
    // lyrData = L.geoJSON.ajax('data/data.geojson').addTo(map);


    var options = {
        maxZoom: 20,
        tolerance: 3,
        debug: 0,
        style: {
            fillColor: "#F2FF00",
            color: "#1EB300",
        },
    };
    var vtLayer = L.geoJson.vt(data, options).addTo(map);
    
    map.on('click', function(e) {
        $.ajax({
            type: "get",
            url: "https://csrnew.yarddogsystems.com/Common/GetPoperties?lng="+e.latlng.lng+"&lat="+e.latlng.lat,
            success: function (res) {
            //    console.log(res);
               if(res.Count>=1){
                 rdata=JSON.parse(res.Json_Result)
                 console.log(rdata);
                 var marker = L.marker([e.latlng.lat, e.latlng.lng], {
                }).addTo(map);
                marker.bindPopup("Parcel info:"+rdata[0].unique_id).openPopup();
                
               }
               
            }
        });
        console.log(e.latlng.lat + ", " + e.latlng.lng)
    });
      
 

});
