import React from 'react';
import NavbarMain from './NavbarMain';
import {Typography} from '@material-ui/core'


function Error404()
{

return (
    <div>
        <NavbarMain isLogin={true}/>
        <Typography>Error 404 ! Page Not Found</Typography>
    </div>

);
}

export default Error404;