import React,{useState,useEffect,useRef} from 'react';

import mapboxgl from 'mapbox-gl';

function GroundsMap({myLat,myLon,groundData})
{

console.log(groundData);

const mapContainerStyle={

    width: "100%",
    height: "500px",
   

}


const [map, setMap] = useState(null);
const mapContainer = useRef(null);


const[groundState,setGroundState]=useState([]);



// useEffect(()=>{
// console.log(groundState);
// },[groundState])



// console.log(groundData[0]);

var groundPopups=[];

for(var i=0;i<groundData.length;i++)
{
if(groundData[i])
{
  console.log(groundData[i].name);
  groundPopups.push(
 
    {
    'type': 'Feature',
    'properties': {
    'description':
    '<h5>'+groundData[i].name+'</h5>',
  
  
    'icon': 'theatre'
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [ groundData[i].location.lon,groundData[i].location.lat]
    }
    });

}


}




useEffect(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6YXJkcmFtb3M0NyIsImEiOiJja2dvMGVlaHEwY2dxMzdtc3lxZzF5Y3FlIn0.gt8y3LtnteaKOIuj-IXs6w';
  const initializeMap = ({ setMap, mapContainer }) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", 
      center: [72.869736,19.113646 ],
      zoom: 12
    });
   
   const popup = new mapboxgl.Popup({ closeOnClick: false })
.setLngLat([myLon, myLat])
.setText('Your Location')
.addTo(map);

const marker = new mapboxgl.Marker().setLngLat([myLon,myLat]).setPopup(popup).addTo(map);
if(groundData[0]){
  var marker1 = new mapboxgl.Marker().setLngLat([groundData[0].location.lon,groundData[0].location.lat]).setPopup(popup).addTo(map);
}


map.on("load", () => {
      
  
      map.addSource('places', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [

          
        ]
        
    }}
      );

      map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true
        }
        });

        map.on('click', 'places', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;
           
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
           
          new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(description)
          .addTo(map);
          });
           
          map.on('mouseenter', 'places', function () {
          map.getCanvas().style.cursor = 'pointer';
          });
           
          map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = '';
          });
          setMap(map);
      map.resize();
    });


  
  };

  if (!map) initializeMap({ setMap, mapContainer });
}, [map]);

return (
<div><div ref={el => (mapContainer.current = el)} style={mapContainerStyle} />
<h3>{groundData[0] ?groundData[0].location.lat:null}</h3>
</div>
);


}

export default GroundsMap;