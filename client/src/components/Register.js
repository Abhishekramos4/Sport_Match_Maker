import React ,{useState}from 'react';
import NavbarMain from './NavbarMain';
import Map from './Map';
import {Paper,Grid,TextField,Typography, Button, Divider,Snackbar} from '@material-ui/core';
import  MuiAlert from '@material-ui/lab/Alert';
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import ImageTitle from './ImageTitle';
import FooterMain from './FooterMain';
import {makeStyles} from '@material-ui/core/styles';

const useStyles=makeStyles((theme)=>({

    mapContainer:{
        width: "100%",
        height: "250px",
        borderWidth:"1px",
        borderStyle:"solid",
        overflow:"hidden"
    },
    formPaper:{
        margin:"10px auto",padding:"3%", width:"90%"
    },
    leftRight:{
        padding:"2%"
    }
,
fields:{
   
}

}));

function Register()
{
   
   const classes=useStyles();
   const history =useHistory();
   const[openAlert,setOpenAlert]=useState(false);

   function handleAlertClose(event,reason)
        {
            if (reason === "clickaway") {
                return;
              }
          
              setOpenAlert(false);
        }

    const[registerForm,updateRegisterForm] =  useState({
        userId:"",
        fname:"",
        lname:"",
        email:"",
        contact:"",
        password:"",
        latitude:null,
        longitude:null
        
    });

    const [errors,updateErrors] = useState(
        {
           msg:""
            
        }
    );

    const [successAlert,setSuccessAlert] = useState(
        {
            msg:"Successfully Registered Your Data"
        }
    );
   
    const[alertSuccessOpen,setAlertSuccessOpen]=useState(false);

    function handleAlertCloseSuccess(event,reason)
    {
        if (reason === "clickaway") {
            return;
          }
      
          setAlertSuccessOpen(false);
          history.push('/login');
    }

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

     function isValid()
        {
        let formIsValid = true;
        if (!registerForm.userId || !registerForm.fname || !registerForm.lname || !registerForm.email ||
            !registerForm.latitude || !registerForm.longitude || !registerForm.password || !registerForm.contact
            ) {
			formIsValid = false;
			updateErrors({
                msg:"Please fill the empty fields."
            });
        }
        

		return formIsValid;
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
      

     // Request   
    function handleSubmit()
    {
        if(!isValid())
    {
        setOpenAlert(true);
    }
    else{

        console.log(registerForm);
        axios.post("http://localhost:5000/register",registerForm)
        .then(function(res){
            console.log(res.data);
            if(res.data.msg==="sucess")
            {
                setAlertSuccessOpen(true);

            }
            else{
                updateErrors({msg:"Error while Registering.Please Try Again"})
                setOpenAlert(true)
            }
        })
        .catch(function(err)
        {
            console.log(err);
        });
    }
        
    }
    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
      }  

 return (

     <div>
<NavbarMain isLogin={true} />
<Paper className={classes.formPaper}>

<ImageTitle title="REGISTER"/>


<form >

<Grid container>
 {/* left side */}
<Grid item xs={12} md={6} className={classes.leftRight} >
<Typography style={{marginBottom:"2%"}}>Personal Details</Typography>
    <Grid container spacing={2}>
    <Grid item  xs={12} md={12}>
    <TextField label="User ID"
    name="userId"
    value={registerForm.userId}
    onChange={handleChange}
    fullWidth
    required
    variant="outlined"
    className={classes.fields}
    autoComplete="off"

/>
</Grid>
<Grid item  xs={12} md={6}>
    <TextField label="First Name"
        name="fname"
        value={registerForm.fname}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
       className={classes.fields}
       autoComplete="off"
    />
</Grid>

<Grid item xs={12} md={6}>
    <TextField label="Last Name"
        name="lname"
        value={registerForm.lname}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        className={classes.fields}
        autoComplete="off"

    />
</Grid>

<Grid item xs={12} md={6}>
    <TextField label="Email"
        name="email"
        type="email"
        value={registerForm.email}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        className={classes.fields}
        autoComplete="off"

    />
</Grid>

<Grid item xs={12} md={6}>
    <TextField label="Contact No"
        name="contact"
        type="contact"
        value={registerForm.contact}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        className={classes.fields}
        autoComplete="off"

    />
</Grid>

<Grid item xs={12} lg={12}>
    <TextField label="Password" 
    name="password"
    value={registerForm.password}
    onChange={handleChange}
    type="password"
    fullWidth
    required
    variant="outlined"
    className={classes.fields}
    autoComplete="off"
/>
</Grid>

</Grid>
</Grid>

{/* end left */}
{/* <Grid item xs={0} md={2}>
 <Divider orientation="vertical"/>

</Grid> */}
   
    {/* right side */}
    <Grid item xs={12} md={6} className={classes.leftRight} >
    <Typography style={{marginBottom:"2%"}} >Location Details</Typography>
    <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} md={6}>
    <TextField  id="latitude" 
        name="latitude"
        type="latitude"
        value={registerForm.latitude}
        onChange={handleChange}
        autoComplete="off"
        variant="outlined" 
        className={classes.fields}     
        autoComplete="off"
        fullWidth

    />
</Grid>

<Grid item xs={12}  md={6}>
    <TextField id="longitude" 
        name="longitude"
        type="longitude"
        autoComplete="off"
        value={registerForm.longitude}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        className={classes.fields}
        
    />
</Grid>

<Grid item xs={12} md={12} >
<div className={classes.mapContainer}>{toShow? <Map latitude={registerForm['latitude']} longitude={registerForm['longitude']}/>:null}</div>
</Grid>
<Grid item xs={12} md={12}>
<Button onClick={handleLocationClick} fullWidth style={{color:"white",backgroundColor:"black"}} >
    Get My Location
</Button>
</Grid>


</Grid>
</Grid>
</Grid>


<Divider style={{marginBottom:"2%"}}/>
<Grid container>
<Grid item xs={12} md={10}><Link to="/login"><Typography>Already User ? Login Here</Typography></Link></Grid>
<Grid item xs={12} md={2}><Button onClick={handleSubmit} style={{color:"white",backgroundColor:"black"}} fullWidth>Submit</Button></Grid>
</Grid>
<Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
        
         
            { errors.msg}
        </Alert>
</Snackbar>
<Snackbar open={alertSuccessOpen} autoHideDuration={6000} onClose={handleAlertCloseSuccess}>
        <Alert onClose={handleAlertCloseSuccess} severity="success">
        
         
            { successAlert.msg}
        </Alert>
</Snackbar>
</form>
</Paper>

<FooterMain/>
</div>
 );
 }

export default Register;