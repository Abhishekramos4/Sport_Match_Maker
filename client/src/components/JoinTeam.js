import React,{useState,useEffect} from 'react';
import NavbarProfile from './NavbarProfile';
import axios from 'axios';
import 
{Button,
    Grid,
  Card,CardActionArea,CardContent, 
  List,
  ListItem,
    Divider, 
    TextField, 
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContentText,
    DialogContent,
    Slide,
    AppBar,
    Toolbar,
    IconButton,
  CircularProgress,
  Paper} from '@material-ui/core';

  import  {makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
    root: {
        display: 'flex',
      },
      
      formPaper:{
        margin:"5px",padding:"3%", width:"90%"
    },
     // necessary for content to be below app bar
      toolbar:theme.mixins.toolbar,
      
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
  
      formControl: {
         minWidth:"100%"
        }
}));



function JoinTeam()
{
    const classes=useStyles();
    const[dialogOpen,setDialogOpen]=useState(false);
    const [searchForm,setSearchForm] = useState({
        teamName:"",
        sport:""

    });

    const[createForm,setCreateForm]=  useState({
        
            teamName:"",
            sport:"",
            captain:"",
            players:[]
    
        }
     );

    function join()
    {
        axios.post(" ",createForm).then((res)=>{
   
        })

    }
    function handleSubmitTeamSearch()
    {

    
        console.log(searchForm);
       axios.post('http://localhost:5000/team-search',searchForm).then(
           (res)=>{

               console.log(res.data);
             setDialogOpen(true);
           }
           
       );
       

    }

    function handleChangeSearchTeam(event)
    { 
     var name =event.target.name;
     var value = event.target.value;
      
     setSearchForm((prevState)=>{
         return ({...prevState,
         [name]:value
         });
     });
    }

    


  return (
    <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
    

    <Paper className={classes.formPaper}>
        <Grid container spacing={2} >
        {/* Left Side */}
        <Grid item xs={12} md={6}>
        <div>
        <Typography variant="h5">
           Join Team
       </Typography>
   <form >
    <TextField label="Team Name" variant="outlined" name="teamName" onChange={handleChangeSearchTeam}/>
   <FormControl variant="outlined" className={classes.formControl}>
   <InputLabel>Sport</InputLabel>
   <Select
     onChange={handleChangeSearchTeam}
     name="sport"
     label="Sport"
    
   >
    
     <MenuItem value="Football">Football</MenuItem>
     <MenuItem value="Cricket">Cricket</MenuItem>
     <MenuItem value="VolleyBall">Volleyball</MenuItem>
   </Select>
 </FormControl>
 <div>
       <Button onClick={handleSubmitTeamSearch} > Search</Button>
       <Dialog
   open={dialogOpen}
   onClose={()=>{setDialogOpen(false)}}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
 >
   <DialogTitle id="alert-dialog-title">{"Is this the Team?"}</DialogTitle>
   
   <DialogContent>
   
     <DialogContentText id="alert-dialog-description">
    Real Madrid
     </DialogContentText>
   </DialogContent>
   <DialogActions>
    
     <Button onClick={()=>{setDialogOpen(false)}} color="primary" autoFocus>
      Cancel
     </Button>
     <Button onClick={join} color="primary">
      Join
     </Button>
   </DialogActions>
 </Dialog>
</div>
               
       </form>
        </div>
            
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={6}>
        <div>
     <Typography variant="h5" style={{marginBottom:"3%"}}>
          Create Team
       </Typography>
       <form >
       <Grid container spacing={2} alignItems="center" style={{padding:"2%"}}>

       <Grid item md={12}>
       <TextField label="Team Name" 
       variant="outlined"
        fullWidth
        autoComplete="off"

       />
       </Grid>
       <Grid item md={12}>
    <FormControl variant="outlined" className={classes.formControl}>
   <InputLabel>Sport</InputLabel>
   <Select
     onChange={handleChangeSearchTeam}
     name="sport"
     label="Sport"
     fullWidth
    
   >
    
     <MenuItem value="Football">Football</MenuItem>
     <MenuItem value="Cricket">Cricket</MenuItem>
     <MenuItem value="VolleyBall">Volleyball</MenuItem>
   </Select>
 </FormControl>
       </Grid>


        <Grid item md={12}>
          <Button fullWidth style={{backgroundColor:"black",color:"white"}}>Create Team</Button>
        </Grid>

      
       </Grid>

           

           
       </form>
     </div>
        </Grid>
        </Grid>
        
    </Paper>
      
</main>
    </div>

 
  );
}

export default JoinTeam;