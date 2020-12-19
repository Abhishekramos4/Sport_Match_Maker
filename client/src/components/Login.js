import React,{useState} from 'react';
import  loginImg from '../images/img3.jpg';
// import { createBrowserHistory } from 'history';
import NavbarMain from './NavbarMain';
import {makeStyles ,Paper,Grid,TextField, Typography, Button,Snackbar,Card
} from '@material-ui/core';
import  MuiAlert from '@material-ui/lab/Alert';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import FooterMain from './FooterMain';



const useStyles = makeStyles((theme)=>({

    loginPaper:{

        margin:"20px auto",padding:"2%",

        [theme.breakpoints.down('sm')]:
        {
            width:"90%"
      
        },
        [theme.breakpoints.down('md')]:
        {
            width:"75%"
      
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
    marginBottom:"3%"

  },
  loginText:{
    [theme.breakpoints.down('sm')]:
    {
       
        fontSize:"20px"
        
    },
    [theme.breakpoints.down('md')]:
    {
        fontSize:"40px"
  
    },
    
    [theme.breakpoints.up('md')]:
    {
       fontSize:"50px"
  
    },
    [theme.breakpoints.up('lg')]:
    {
       fontSize:"60px"
       
  
    },
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
            msg:""
            
        }
            
        );

        const[openAlert,setOpenAlert]=useState(false);
        const[openAlertInvalid,setOpenAlertInvalid] = useState(false);
        



        function handleAlertClose(event,reason)
        {
            if (reason === "clickaway") {
                return;
              }
          
              setOpenAlert(false);
        }

        function handleAlertCloseInvalid(event,reason)
        {
            if (reason === "clickaway") {
                return;
              }
          
              setOpenAlertInvalid(false);
        }
    
        function isValid()
        {
        let formIsValid = true;
		if (!loginForm.userId || !loginForm.password) {
			formIsValid = false;
			updateErrors({msg: "Please fill Empty fields"});
			
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
        .then(res=>{

            console.log(res);
            if(res.data.msg=="Not found")
            {
                setOpenAlertInvalid(true);
            }
            else{

                
            

        props.handleUserToken(res.data.token);
        history.push('/profile');
            
    }
        
        
        
        
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
<Paper elevation={5} className={classes.loginPaper} >


   <div style={{position:"relative",
     color:"white",
        textAlign:"center",marginBottom:"2%"}}>
   <img src={loginImg} height="250px" width="100%" style={{borderRadius:"5px"}}/>
   <div style={{position:"absolute",bottom:"10%" ,left:"35%"}}>
       <Typography className={classes.loginText}>LOGIN</Typography>
   </div>
   </div>
    

    <form >
    
        
            <TextField
            
              className={classes.textField} 
                variant="outlined"
                label="User ID"
                name="userId"
                value={loginForm.userId}
                onChange={handleChange}
                autoComplete="off"
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
                autoComplete="off"
                fullWidth
                
                
            />

        <Link to="/register"><Typography>New User ? Register</Typography></Link>
        <Grid container>
            <Grid item xs={0} md={9}> </Grid>
            <Grid item xs={12} md={3}>  <Button onClick={handleSubmit} variant="outlined"  style={{backgroundColor:"black",color:"white",width:"100%"}}>Login</Button></Grid>
        </Grid>

       
        <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
         { errors.msg}
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertInvalid} autoHideDuration={6000} onClose={handleAlertCloseInvalid}>
        <Alert onClose={handleAlertCloseInvalid} severity="error">
         { "Invalid Credentials.Please Try Again"}
        </Alert>
      </Snackbar>
    </form>
</Paper>
</div>
<FooterMain/>


</div>
);

}

export default Login;