
import React,{useEffect, useState} from 'react';
import NavbarProfile from './NavbarProfile';
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
Button

} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  brandName:{
    fontFamily: "'Grenze Gotisch', cursive",
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

function Profile() {
const [data,setData]=useState("");
const [isIndividual,setIsIndividual]=useState(false);
const[radioVal,setRadioVal]=useState("team");

function handleRadioChange(event)
{
  var val=event.target.value;
  setRadioVal(val);
  if(val==="individual")
  {
    setIsIndividual(true);
  }
  else{
    setIsIndividual(false);
  }

}

function handleMatchFind()
{

}
  useEffect (()=>{
     
    var token = localStorage.getItem("userToken");
   
    axios.get('http://localhost:5000/profile',{ headers: {
      Authorization : `Bearer ${token}`
  }})
    .then ((res)=>{
      console.log(res.data);
      setData(res.data.msg);
    }).catch(err=>{console.log(err);});

    }
);


  const classes = useStyles();
    const theme = useTheme();
  return (
    <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        <Paper  className={classes.formPaper}>
          <Typography variant="h5">Find A Match</Typography>
          <form>
      <FormControl style={{width:"100%"}} component="fieldset" className={classes.fields}>
      <FormLabel>Type of Sport </FormLabel>
      <RadioGroup  name="sportType" value={radioVal} onChange={handleRadioChange}>
        <Grid container>
          <Grid item xs={12} md={6}><FormControlLabel  color="default" value="team" control={<Radio />} label="Team" /></Grid>
          <Grid item xs={12} md={6}><FormControlLabel value="individual" control={<Radio />} label="Indivdual" />
        </Grid>
        </Grid>
         </RadioGroup>
    </FormControl>

<Grid container>

<Grid item xs={12} md={6}>
<FormControl  className={classes.fields} variant="outlined"  style={{width:"70%"}} >
        <InputLabel>Sport</InputLabel>
        <Select
          name="sport"
          label="Sport"
        
        >
          <MenuItem value="Football">Chess</MenuItem>
          <MenuItem value="Cricket">Badminton</MenuItem>
          <MenuItem value="VolleyBall">Tennis</MenuItem>
        </Select>
      </FormControl>
</Grid>
{
  isIndividual===false?  <Grid item xs={12} md={6}>
  <FormControl  className={classes.fields} variant="outlined" style={{width:"70%"}} >
        <InputLabel>Teams</InputLabel>
        <Select
          name="team"
          label="team"
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
   className={classes.fields}
  style={{width:"70%"}}
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
   className={classes.fields}
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
      </main>
    </div>
  );
}



export default Profile;
