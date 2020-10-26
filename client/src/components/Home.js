import React from 'react';
import bgImage from '../images/img5_cr.jpg'
import NavbarMain from '../components/NavbarMain'; 
import {Grid} from '@material-ui/core';
function Home()
{
    return (
<div>
    <NavbarMain  isLogin ={false}/>
    <div>
        <img src={bgImage}  
        width="100%"
         />
        
    </div>
      

    </div>

    );
    

    
   

}

export default Home;