import React,{useState} from 'react';
import  loginImg from '../images/img2.jpg';
// import { createBrowserHistory } from 'history';
import NavbarMain from './NavbarMain';
import {makeStyles ,Paper,Grid,TextField, Typography, Button,Snackbar,} from '@material-ui/core';
import  MuiAlert from '@material-ui/lab/Alert';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';




const useStyles = makeStyles((theme)=>({

    loginPaper:{

        margin:"20px auto",padding:"1% 2%",

        [theme.breakpoints.down('sm')]:
        {
            width:"90%"
      
        },
        [theme.breakpoints.down('md')]:
        {
            width:"60%"
      
        },
        
        [theme.breakpoints.up('md')]:
        {
            width:"40%"
      
        },
        [theme.breakpoints.up('lg')]:
        {
            width:"40%"
      
        },


    },
  textField:{
    marginBottom:"10px"

  }



}));

 


function Login(props)
{

    const classes = useStyles();
    const history = useHistory();
    const [loginForm,updateLoginForm] =useState({
        userId:"",
        password:""
        });

    const [errors,updateErrors]=useState(
        {
            userId:"",
            password:""
            }
            
        );

        const[openAlert,setOpenAlert]=useState(false);
        



        function handleAlertClose(event,reason)
        {
            if (reason === "clickaway") {
                return;
              }
          
              setOpenAlert(false);
        }
    
        function isValid()
        {
        let formIsValid = true;
		if (!loginForm.userId) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				userId: "UserId can't be Empty"
			}));
		}

		if (!loginForm.password) {
			formIsValid = false;
			updateErrors(prevErrors => ({
				...prevErrors,
				password: "Please enter your password."
			}));
		}

		return formIsValid;
        }


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
    if(!isValid())
    {
        setOpenAlert(true);
    }
    else{
        console.log(loginForm);
        axios.post("http://localhost:5000/login",loginForm)
        .then(res=>{console.log(res.data)
        
        props.handleUserToken(res.data.token);
        history.push('/profile');
        
        
        }
        
    
        
        
        )
        .catch(err=>{console.log(err)});
    }
       

}
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }    

return (

<div >

<NavbarMain isLogin={true} />

<div >
<Paper elevation={5} className={classes.loginPaper}>

    

    <form >
    
        
            <TextField
            
              className={classes.textField} 
                variant="outlined"
                label="User ID"
                name="userId"
                value={loginForm.userId}
                onChange={handleChange}
                fullWidth
                

            />
        
            <TextField 
             className={classes.textField}
                variant="outlined"
                label="Password"
                name="password" 
                type="password"
                value={loginForm.password}
                onChange={handleChange}
                fullWidth
                
                
            />

        <Link to="/register"><Typography>New User ? Register</Typography></Link>
        <Button onClick={handleSubmit}>Submit</Button>
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
        
         
            { errors.userId!==""? errors.userId:errors.password}
        </Alert>
      </Snackbar>
    </form>
</Paper>
</div>



</div>
);

}

export default Login;