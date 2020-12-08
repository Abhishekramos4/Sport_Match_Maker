import React,{useState,useEffect,useRef} from 'react';
import Loading from './Loading';
import mapboxgl from 'mapbox-gl';

function GroundsMap(props)
{



const mapContainerStyle={

    width: "100%",
    height: "500px",
   

}


const [map, setMap] = useState(null);
const mapContainer = useRef(null);
const {myLat,myLon,groundData}=props;


var groundPopups=[];


for(var i=0;i<groundData.length;i++)
   {
     groundPopups.push({
      'type': 'Feature',
      'properties': {
      'description':
      '<h6>'+groundData[i].Name+'</h6>'+
      '<p><b>Address: </b>'+groundData[i].Address+'</p>'
      +'<p><b>Contact No : </b>'+groundData[i].Contact+'</p>'
      +'<p><b>Rating: </b>'+groundData[i].Ratings+'/5 </p>'
      

      },
      'geometry': {
      'type': 'Point',
      'coordinates': [ groundData[i].Longitude,groundData[i].Latitude]
      }
      })

   }


useEffect(() => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6YXJkcmFtb3M0NyIsImEiOiJja2dvMGVlaHEwY2dxMzdtc3lxZzF5Y3FlIn0.gt8y3LtnteaKOIuj-IXs6w';
  const initializeMap = ({ setMap, mapContainer }) => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11", 
      center: [myLon,myLat],
      zoom: 12
    });
   
   const popup = new mapboxgl.Popup({ closeOnClick: false })
.setLngLat([myLon, myLat])
.setText('Your Location')
.addTo(map);

const marker = new mapboxgl.Marker().setLngLat([myLon,myLat]).setPopup(popup).addTo(map);

console.log(marker);
 map.on("load", () => {
      
  map.loadImage(
    'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
    function (error, image) {
      if (error) throw error;
      map.addImage('custom-marker', image);
       
      map.addSource('places', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': groundPopups
        
    }}
      );
      // Add a layer showing the places.
      map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': 'places',
      'layout': {
      'icon-image': 'custom-marker',
      'icon-allow-overlap': true
      }
      });
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
}, [map,groundPopups,groundData]);

return <div ref={el => (mapContainer.current = el)} style={mapContainerStyle} />;
}


export default GroundsMap;