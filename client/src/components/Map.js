import React,{useState,useEffect,useRef} from 'react';
import mapboxgl from 'mapbox-gl';

function Map(props)
{
    // mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6YXJkcmFtb3M0NyIsImEiOiJja2dvMGVlaHEwY2dxMzdtc3lxZzF5Y3FlIn0.gt8y3LtnteaKOIuj-IXs6w';
    const mapContainerStyle={

        position: "absolute",
        
        width: "400px",
        height: "300px",

    }
        
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
  
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiaGF6YXJkcmFtb3M0NyIsImEiOiJja2dvMGVlaHEwY2dxMzdtc3lxZzF5Y3FlIn0.gt8y3LtnteaKOIuj-IXs6w';
      const initializeMap = ({ setMap, mapContainer }) => {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v11", 
          center: [props.longitude, props.latitude],
          zoom: 13
        });
       const marker = new mapboxgl.Marker().setLngLat([props.longitude, props.latitude]).addTo(map);
        map.on("load", () => {
          setMap(map);
          map.resize();
        });
      };
  
      if (!map) initializeMap({ setMap, mapContainer });
    }, [map]);
  
    return <div ref={el => (mapContainer.current = el)} style={mapContainerStyle} />;

 
}

export default Map;