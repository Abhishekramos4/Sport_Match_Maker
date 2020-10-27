import React,{useState} from 'react';
import NavbarMain from './NavbarMain';
import bgImage from '../images/img2.jpg';
import {Paper,Grid,TextField,makeStyles, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';


 

    function handleChange()
{

}

function Login()
{
    const [loginForm,updateLoginForm] =useState({
        userId:"",
        password:""
        });
    

return (

<div >

<NavbarMain isLogin={true} />
<img src={bgImage}/>

<Paper style={{margin:"5px",padding:"1% 2%", width:"40%"}}>
    <form >
    <Grid container>
        <Grid item lg={12}>
            <TextField 
                label="User ID"
                name="userId"
                onChange={handleChange}
                fullWidth
                required

            />
        </Grid>
        <Grid item lg={12}>
            <TextField 
                label="Password"
                name="password" 
                fullWidth
                required
            />
        </Grid>
    </Grid>
        <Link to="/register"><Typography>New User ? Register</Typography></Link>
        <Button>Submit</Button>
    </form>
</Paper>


</div>
);

}

export default Login;