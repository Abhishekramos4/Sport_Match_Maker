import React from 'react';
import {CircularProgress} from '@material-ui/core'

function Loading()
{
    return (
        <div style={{textAlign:"center",marginTop:"300px"}}><CircularProgress style={{color:"black"}} /></div>
    );
}
export default Loading;