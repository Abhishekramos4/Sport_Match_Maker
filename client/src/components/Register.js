import React ,{useState}from 'react';
import NavbarMain from './NavbarMain';
import Map from './Map';
import {Paper,Grid,TextField,makeStyles, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';




function Register()
{
   

    const[registerForm,updateRegisterForm] =  useState({
        userId:"",
        fname:"",
        lname:"",
        email:"",
        password:"",
        latitude:null,
        longitude:null
        
    });

    const[toShow,showMap] = useState(false);


    function handleChange(event)
    {
        var name =event.target.name;
        var value = event.target.value;

        updateRegisterForm(
          function  (prevState){
            return (
                {
                    ...prevState,
                    [name]:value
                }
            );
          }

        );
     }
    
     function handleLocationClick()
    {
       if(!navigator.geolocation)
       {
           alert("Location not supported by your browser");
       }
       else
       {
         navigator.geolocation.getCurrentPosition(success);
        }
    }

       function success(position)
       {
           
       
            document.getElementById("latitude").value=(position.coords.latitude).toString();
            document.getElementById("longitude").value=(position.coords.longitude).toString();
            
            
            updateRegisterForm(
                prevState=>{
                   return( {...prevState,
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                });
                }

            );
            
           
            showMap(true);

            

            console.log(registerForm);
           
            
        }
      
    function handleSubmit()
    {
        console.log(registerForm);
        axios.post("http://localhost:5000/register",registerForm)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err)
        {
            console.log(err);
        });
    }


 return (

     <div>
<NavbarMain isLogin={true} />
<Paper style={{margin:"5px",padding:"2px", width:"40%"}}>
<form >
<Grid container>
<Grid item lg={12}>
<TextField label="User ID"
    name="userId"
    value={registerForm.userId}
    onChange={handleChange}
    fullWidth
    required

/>
</Grid>
<Grid item>
    <TextField label="First Name"
        name="fname"
        value={registerForm.fname}
        onChange={handleChange}
        fullWidth
        required

    />
</Grid>

<Grid item>
    <TextField label="Last Name"
        name="lname"
        value={registerForm.lname}
        onChange={handleChange}
        fullWidth
        required

    />
</Grid>

<Grid item>
    <TextField label="Email"
        name="email"
        type="email"
        value={registerForm.email}
        onChange={handleChange}
        fullWidth
        required

    />
</Grid>

<Grid item>
    <TextField  id="latitude" 
        name="latitude"
        type="latitude"
        value={registerForm.latitude}
        onChange={handleChange}
        fullWidth
      

    />
</Grid>

<Grid item>
    <TextField id="longitude" 
        name="longitude"
        type="longitude"
        value={registerForm.longitude}
        onChange={handleChange}
        fullWidth
        
    />
</Grid>

<Button onClick={handleLocationClick} >
    Get My Location
</Button>

<Grid item lg={12}>
    <TextField label="Password" 
    name="password"
    value={registerForm.password}
    onChange={handleChange}
    type="password"
    fullWidth
    required
/>
</Grid>
</Grid>
<Link to="/login"><Typography>Already User ? Login Here</Typography></Link>
<Button onClick={handleSubmit}>Submit</Button>
</form>
</Paper>
<div>{toShow? <Map latitude={registerForm['latitude']} longitude={registerForm['longitude']}/>:null}</div>
</div>
 );
 }

export default Register;