import React,{useState} from 'react';
import  loginImg from '../images/img2.jpg';
import NavbarMain from './NavbarMain';
import {Paper,Grid,TextField,makeStyles, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';

 

function Login()
{
    const [loginForm,updateLoginForm] =useState({
        userId:"",
        password:""
        });

        function handleChange(event )
{
    var name =event.target.name;
    var value = event.target.value;

    updateLoginForm(function(prevState){

        return ({

            ...prevState,
            [name]:value

        });
    });
}

function handleSubmit()
{
        console.log(loginForm);
        axios.post("http://localhost:5000/login",loginForm)
        .then(res=>{console.log(res.data)})
        .catch(err=>{console.log(err)});

}
    

return (

<div >

<NavbarMain isLogin={true} />

<div >
<Paper  style={{margin:"20px auto",padding:"1% 2%",width:"50%"}}>

    <img src={loginImg} width="100%" height="150px"/>

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
                type="password"
                onChange={handleChange}
                fullWidth
                required
                
            />
        </Grid>
    </Grid>
        <Link to="/register"><Typography>New User ? Register</Typography></Link>
        <Button onClick={handleSubmit}>Submit</Button>
    </form>
</Paper>
</div>



</div>
);

}

export default Login;