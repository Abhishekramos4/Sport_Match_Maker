import React from 'react';
import BgImage from '../images/img8.jpg';
import {Typography} from '@material-ui/core';
function ImageTitle(props)
{

return (
<div style={{backgroundImage:`url(${BgImage})` ,borderRadius:"5px",marginBottom:"15px" ,color:"white",padding:"2%"}}>
<Typography align="center" variant="h4">{props.title}</Typography>
</div>

)

}

export default ImageTitle;