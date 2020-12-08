 import React from 'react';
 import GroundsMap from './GroundsMap';


 function GroundsMapHolder(props)
 {
     const{groundData}= props;

    return(<div><GroundsMap myLat={localStorage.getItem("userLat")} myLon={localStorage.getItem("userLong")} groundData={groundData}/></div>);


 }

 export default GroundsMapHolder;