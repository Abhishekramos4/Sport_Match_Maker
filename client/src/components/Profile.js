
import React,{useEffect, useState,forwardRef} from 'react';
import NavbarProfile from './NavbarProfile';
import FoundTeams from './FoundTeams';
import {Typography
,Paper
,TextField,
Grid,
Select,
MenuItem,
InputLabel,
Radio,
RadioGroup,
FormControl,
FormControlLabel,
FormLabel,
Button,
Dialog,
Slide,
DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,

} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
toolbar:theme.mixins.toolbar,
  fields:{
    margin:"3%"
  },

  formPaper:{
    padding:"2%"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {

const [isIndividual,setIsIndividual]=useState(false);
const[radioVal,setRadioVal]=useState("team");
const[userData,setUserData ]=useState({});
const[matchForm,setMatchForm]=useState({

  type:"team",
  team:"",
  date:"",
  time:"",
  sport:""
  

});
const[founded,setFounded]=useState([]);

const [openDialog,setOpenDialog]=useState(false);

function handleDialogClose()
{
   setOpenDialog(false);
}

function handleDialogOpen()
{
    setOpenDialog(true);
}

function handleOnChangeRadio(event)
{
  var name=event.target.name;
  var val=event.target.value;

  
    setRadioVal(val);
    setMatchForm((prev)=>(
{
  ...prev,
[name]:val
}
    ))
    if(val=="individual")
    {
      setIsIndividual(true);
    }
    else{
      setIsIndividual(false);
    }
  

  
  
}


function handleOnChange(event)
{
  var name=event.target.name;
  var val=event.target.value;

  setMatchForm((prev)=>{
    return({
      ...prev,
      [name]:val

    })
  })
}


function handleMatchFind()
{

  // 
  var teams=[{
    teamName:"Barcelona",
    teamLocation:{
      longitude:72.831757,
      latitude:19.116541
    }
  },{
    teamName:"Juventus",
    teamLocation:{
      longitude:72.861076,
      latitude:19.112104
    }

  }];

  setFounded(teams);
  handleDialogOpen();





}
  


useEffect (()=>{
     
    var token = localStorage.getItem("userToken");
   
    axios.get('http://localhost:5000/profile',{ headers: {
      Authorization : `Bearer ${token}`
  }})
    .then ((res)=>{
      console.log(res.data.userData);
     setUserData({... res.data.userData})

    }).catch(err=>{console.log(err);});

    },[]
);


  const classes = useStyles();
    const theme = useTheme();
  return (
    <div className={classes.root}>
      <NavbarProfile fname={userData.fname} lname={userData.lname}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        <Paper  className={classes.formPaper}>
          <Typography variant="h5">Find A Match</Typography>
          <form>
      <FormControl style={{width:"100%"}} component="fieldset" className={classes.fields} >
      <FormLabel>Type of Sport </FormLabel>
      <RadioGroup  name="type" value={radioVal} onChange={handleOnChangeRadio}>
        <Grid container>
          <Grid item xs={12} md={6}><FormControlLabel  color="default" value="team" control={<Radio />} label="Team" /></Grid>
          <Grid item xs={12} md={6}><FormControlLabel value="individual" control={<Radio />} label="Indivdual" />
        </Grid>
        </Grid>
         </RadioGroup>
    </FormControl>

<Grid container>

<Grid item xs={12} md={6}>
{
  isIndividual?<FormControl  className={classes.fields} variant="outlined"  style={{width:"70%"}} >
        <InputLabel>Sport</InputLabel>
        <Select
          name="sport"
          label="Sport"
        onChange={handleOnChange}
        >
          <MenuItem value="Chess">Chess</MenuItem>
          <MenuItem value="Badminton">Badminton</MenuItem>
          <MenuItem value="VolleyBall">VolleyBall</MenuItem>
        </Select>
      </FormControl> :
      <FormControl  className={classes.fields} variant="outlined"  style={{width:"70%"}} >
        <InputLabel>Sport</InputLabel>
        <Select
          name="sport"
          label="Sport"
        onChange={handleOnChange}
        >
          <MenuItem value="Football">Football</MenuItem>
          <MenuItem value="Cricket">Cricket</MenuItem>
          <MenuItem value="VolleyBall">VolleyBall</MenuItem>
        </Select>
      </FormControl>
}

</Grid>
{
  isIndividual===false?  <Grid item xs={12} md={6}>
  <FormControl  className={classes.fields} variant="outlined" style={{width:"70%"}} >
        <InputLabel>Teams</InputLabel>
        <Select
          name="team"
          label="team"
          onChange={handleOnChange}
        >
          <MenuItem value="ABC">ABC</MenuItem>
          <MenuItem value="XYZ">XYZ</MenuItem>
          <MenuItem value="EFG">EFG</MenuItem>
        </Select>
      </FormControl>
  </Grid>  
  :
  <Grid item xs={12} md={6}>
  
  </Grid> 

}


</Grid>


<Grid container >
 <Grid item xs={12} md={6}>
  <TextField
  onChange={handleOnChange}
   className={classes.fields}
  style={{width:"70%"}}
  name="date"
    id="date"
    variant="outlined"
    label="Match Date"
    type="date"
    InputLabelProps={{

      shrink: true,
    }}
  />
  </Grid>
  <Grid  item xs={12} md={6}>
  <TextField
  onChange={handleOnChange}
   className={classes.fields}
   name="time"
    style={{width:"70%"}}
    id="time"
    variant="outlined"
    label="Match Time"
    type="time"
    InputLabelProps={{

      shrink: true,
    }}
  />

  
  </Grid>
</Grid>
<Grid container>
  <Grid item xs={12} md={6}>

  </Grid>
  <Grid item xs={12} md={6}>
  <Button className={classes.fields} variant="contained" style={{width:"30%",marginLeft:"50%"}} onClick={handleMatchFind}>
 <Typography>Find</Typography>
</Button>
  </Grid>
</Grid>


</form>
  </Paper>
</Typography>
 <Dialog fullScreen open={openDialog} onClose={handleDialogClose} TransitionComponent={Transition} >
       <FoundTeams nearbyTeams= {founded} closeFunc={handleDialogClose} />
   </Dialog>


      </main>
    </div>
  );
}



export default Profile;
 