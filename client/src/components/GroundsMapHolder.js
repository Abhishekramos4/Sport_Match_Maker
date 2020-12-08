 import React from 'react';
 import GroundsMap from './GroundsMap';


 function GroundsMapHolder(props)
 {
     const{groundData}= props;

    return(<div><GroundsMap myLat={19.113646} myLon={72.869736} groundData={groundData}/></div>);


 }

 export default GroundsMapHolder;