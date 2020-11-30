import React,{useState,useEffect} from 'react';
import GroundsMap from './GroundsMap';
import axios from 'axios';
function GroundNearMe()
{

const [groundData,setGroundData]=useState([]);

    useEffect(()=>{

 //axios.post
var arr=[{"Name": "Dream Sports Fields Pvt Ltd..",
"Address": "Crystal Plaza, Oshivara Link Road, Andheri West, Mumbai - 400053, Opposite Infinti Mall",
"Contact": "07947172083",
"Ratings": "4.1",
"Location": {
    "lil": "19.1251368",
    "lon": "72.841665"
},
},
{
    "Name": "Get Set Play",
    "Address": "Piramal Agastya Private Limited, Kamani-kurla West, Mumbai - 400070, Opposite Fire Brigade",
    "Contact": "07947190450",
    "Ratings": "5.0",
    "Location": {
        "lil": "19.0867259",
        "lon": "72.8860501"
    }
}
]
 setGroundData(arr);

    });
return (
<GroundsMap groundData={groundData}/>

);



}

export default GroundNearMe;