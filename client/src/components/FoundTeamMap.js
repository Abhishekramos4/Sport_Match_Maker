import React,{useState,useEffect,useRef} from 'react';
import mapboxgl from 'mapbox-gl';

function Map(props)
{
    
    const mapContainerStyle={

        width: "100%",
        height: "600px",
       

    }

    
  
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    const{latitude,longitude,teams}=props
  


  

   var teamPopups=[];
   
   

   for(var i=0;i<teams.length;i++)
   {
     teamPopups.push({
      'type': 'Feature',
      'properties': {
      'description':
      '<h6>'+teams[i].name+'</h6>'+
      '<p><b>Sport: </b>'+teams[i].sports+'</p>'  
      +'<p><b>Captain : </b>'+teams[i].captain+'</p>'
      },
      'geometry': {
      'type': 'Point',
      'coordinates': [ teams[i].longitude,teams[i].latitude]
      }
      })

   }

  //  console.log(teamPopups);



    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6YXJkcmFtb3M0NyIsImEiOiJja2dvMGVlaHEwY2dxMzdtc3lxZzF5Y3FlIn0.gt8y3LtnteaKOIuj-IXs6w';
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", 
          center: [props.longitude, props.latitude],
          zoom: 12
        });
       
       const popup = new mapboxgl.Popup({ closeOnClick: false })
.setLngLat([props.longitude, props.latitude])
.setText('Your Location')
.addTo(map);

const marker = new mapboxgl.Marker().setLngLat([longitude,latitude]).setPopup(popup).addTo(map);

//  console.log(teamPopups);
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
            'features': teamPopups
        }}
          );

          map.addLayer({
            'id': 'places',
            'type': 'symbol',
            'source': 'places',
            'layout': {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': false
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
    }, [map,teamPopups,teams]);
  
    return <div ref={el => (mapContainer.current = el)} style={mapContainerStyle} />;

 
}

export default Map;