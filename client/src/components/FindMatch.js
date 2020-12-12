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
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Loading from './Loading';


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
  radio:{
  color:"black",
  '&$checked': {
    color:"black",
  }
  },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));


  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
   

function FindMatch()
{


const [isFetching,setIsFetching]=useState(true);
const [isCaptain,setIsCaptain]=useState(true);
const[Football,setFootball]=useState([]);
const[Cricket,setCricket]=useState([]);
const[Volleyball,setVolleyball]=useState([]);
const[matchReq,setMatchReq]=useState({});

    useEffect(()=>{

  axios.get("http://localhost:5000/captain-teams-search",{
    params:{
      userId:localStorage.getItem("userId")
    }
  }).then((res)=>{
    setIsFetching(false);
    console.log(res);
    if(res.data.isCaptain==false)
    {
      setIsCaptain(false);
    }
    else{
      setIsCaptain(true);
      setFootball(res.data.Football);
      setCricket(res.data.Cricket);
      setVolleyball(res.data.Volleyball);
    }

  })
    },[]);



    const [isIndividual,setIsIndividual]=useState(false);

    const[radioVal,setRadioVal]=useState("team");
    
    const[matchFormCaptain,setMatchFormCaptain]=useState({
    
      type:"team",
      team:"",
      date:"",
      time:"",
      sport:""
      
    
    });

    const[matchFormPlayer,setMatchFormPlayer]=useState({
        type:"individual",
        sport:"",
        date:"",
        time:""
    });
    const[founded,setFounded]=useState([]);
    
    const [openDialog,setOpenDialog]=useState(false);

    


//Main Dialog
    function handleDialogClose()
    {
       setOpenDialog(false);
    }
    
    function handleDialogOpen()
    {
        setOpenDialog(true);
    }
    

//-----------------------------------------------PLAYER-----------------------------------------------------------------//

    //Handle Change Player

    function handleOnChangePlayer(event)
    {
      var name=event.target.name;
      var val=event.target.value;

      setMatchFormPlayer((prev)=>(

        {
          ...prev,
          [name]:val
        }
      ));


    }

    //Find Match Player

    function handleMatchFindPlayer()
    {

      console.log(matchFormPlayer);
      setMatchReq(matchFormPlayer);
      console.log("Request to Nearby Players");
     var data = {
        userId:localStorage.getItem("userId"),
        sport:matchFormPlayer.sport,
        latitude:localStorage.getItem("userLat"),
        longitude:localStorage.getItem("userLong")
     }
      axios.post("http://localhost:5000/nearby-individuals",data)
      .then((res)=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })


    }

//-------------------------------------------------------------------------------------------------------------------------------



//--------------------------------------------------CAPTAIN------------------------------------------------------------------------

    //Handle Change Captain 
    function handleOnChangeRadioCaptain(event)
    {
      var name=event.target.name;
      var val=event.target.value;
    
      
        setRadioVal(val);
        setMatchFormCaptain((prev)=>(
    {
      ...prev,
    [name]:val
    }
        ));
        if(val=="individual")
        {
          setIsIndividual(true);
        }
        else{
          setIsIndividual(false);
        }
      
    
      
      
    }
    
    
    function handleOnChangeCaptain(event)
    {
      var name=event.target.name;
      var val=event.target.value;
    
      setMatchFormCaptain((prev)=>{
        return({
          ...prev,
          [name]:val
    
        })
      })
    }
    
    //Find Match Captain
    function handleMatchFindCaptain()
    {
      
     
      console.log(matchFormCaptain);
        setMatchReq(matchFormCaptain);
      if(matchFormCaptain.type=="individual")
      {
        console.log("Request to nearby individual");
        var data = {
          userId:localStorage.getItem("userId"),
          sport:matchFormCaptain.sport,
          latitude:localStorage.getItem("userLat"),
          longitude:localStorage.getItem("userLong")

       }
        axios.post("http://localhost:5000/nearby-individuals",data)
        .then((res)=>{
          console.log(res);
          setFounded(res.data.nearbyUsers);
        }).catch(err=>{
          console.log(err);
        })
      }
     else if(matchFormCaptain.type=="team")
     {
      var data={
        captain:localStorage.getItem("userId"),
        teamName:matchFormCaptain.team,
        sport:matchFormCaptain.sport,
        latitude:localStorage.getItem("userLat"),
        longitude:localStorage.getItem("userLong")
      }
      axios.post("http://localhost:5000/get-nearby-teams",data).
      then((res)=>{
        console.log(res);
        setFounded(res.data.teams);

      }).catch((err)=>{
        console.log(err);
      })
     

     }
         
      handleDialogOpen();
    
    
    
    
    
    }

//----------------------------------------------------------------------------------------------------------------------------------
    

   

    const classes=useStyles();

return (

    
    <div className={classes.root}>
      <NavbarProfile />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          isFetching?<Loading/>:isCaptain?
         
          <div>
          <Paper  className={classes.formPaper}>
          <Typography variant="h5">Find A Match</Typography>
          <form>
      <FormControl style={{width:"100%"}} component="fieldset" className={classes.fields} >
      <FormLabel>Type of Sport </FormLabel>
      <RadioGroup  className={classes.radio} name="type" value={radioVal} onChange={handleOnChangeRadioCaptain}>
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
        onChange={handleOnChangeCaptain}
        value={matchFormCaptain.sport}
        >
          <MenuItem value="Chess" key="Chess">Chess</MenuItem>
          <MenuItem value="Badminton" key="Badminton" >Badminton</MenuItem>
          <MenuItem value="Tennis"  key="Tennis">Tennis</MenuItem>
          <MenuItem value="Pool" key="Pool">Pool</MenuItem>
          
        </Select>
      </FormControl> :
      <FormControl  className={classes.fields} variant="outlined"  style={{width:"70%"}} >
        <InputLabel>Sport</InputLabel>
        <Select
          name="sport"
          label="Sport"
        onChange={handleOnChangeCaptain}
        value={matchFormCaptain.sport}
        >
          <MenuItem value="Football" key="Football">Football</MenuItem>
          <MenuItem value="Cricket"   key="Cricket">Cricket</MenuItem>
          <MenuItem value="Volleyball" key="Volleyball">Volleyball</MenuItem>
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
          onChange={handleOnChangeCaptain}
          value={matchFormCaptain.team}
        >
        {
          matchFormCaptain.sport==="Football"
          ?
          Football.map((item)=>{
            return(
              <MenuItem value={item} key={item}>{item}</MenuItem>
            );
          })
          :null
         }

         {
          matchFormCaptain.sport==="Cricket"
          ?
          Cricket.map((item)=>{
            return(
              <MenuItem value={item} key={item}>{item}</MenuItem>
            );
          })
          :null
         }
         {
          matchFormCaptain.sport==="Volleyball"
          ?
          Volleyball.map((item)=>{
            return(
              <MenuItem value={item} key={item}>{item}</MenuItem>
            );
          })
          :null
         }
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
  onChange={handleOnChangeCaptain}
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
  onChange={handleOnChangeCaptain}
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
  <Grid item xs={12} md={10}>

  </Grid>
  <Grid item xs={12} md={2}>
  <Button className={classes.fields} variant="contained" style={{backgroundColor:"black",
  color:"white"}} onClick={handleMatchFindCaptain}>
 Find
</Button>
  </Grid>
</Grid>


</form>
  </Paper>

          </div>
          
          :<div>
            <Typography>As you are not captain of any team you cannot Find match for team Sports</Typography>
            <Paper  className={classes.formPaper}>
          <Typography variant="h5">Find A Match</Typography>
          <form>

<Grid container>

<Grid item xs={12} md={6}>

  <FormControl  className={classes.fields} variant="outlined"  style={{width:"70%"}} >
        <InputLabel>Sport</InputLabel>
        <Select
          name="sport"
          label="Sport"
        onChange={handleOnChangePlayer}
        >
          <MenuItem value="Chess" key="Chess">Chess</MenuItem>
          <MenuItem value="Badminton" key="Badminton" >Badminton</MenuItem>
          <MenuItem value="Tennis"  key="Tennis">Tennis</MenuItem>
          <MenuItem value="Pool" key="Pool">Pool</MenuItem>
        </Select>
      </FormControl> 

</Grid>

</Grid>


<Grid container >
 <Grid item xs={12} md={6}>
  <TextField
  onChange={handleOnChangePlayer}
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
  onChange={handleOnChangePlayer}
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
  <Grid item xs={12} md={10}>

  </Grid>
  <Grid item xs={12} md={2}>
  <Button className={classes.fields} variant="contained" style={{backgroundColor:"black",
  color:"white"}} onClick={handleMatchFindPlayer}>
 Find
</Button>
  </Grid>
</Grid>


</form>
  </Paper>

          </div>


        }

      
       

 <Dialog fullScreen open={openDialog} onClose={handleDialogClose} TransitionComponent={Transition} >
       <FoundTeams nearbyTeams= {founded} matchReq={matchReq} closeFunc={handleDialogClose} />
   </Dialog>


      </main>
    </div>
   

);

}

export default FindMatch;