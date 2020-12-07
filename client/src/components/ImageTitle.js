import React from 'react';
import {bgImg} from '../images/img.jpg';
function ImageTitle({height,width})
{

return (
<div style={{overflow:"hidden",height:height,width:width}}>
    <img src={bgImg}/>
</div>)

}

export default ImageTitle;