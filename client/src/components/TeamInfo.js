import React,{useEffect,useState} from 'react';
import 
{Button, 
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
  CircularProgress} from '@material-ui/core';
import {makeStyles,useTheme} from '@material-ui/core/styles'
import NavbarProfile from '../components/NavbarProfile';
import TeamCard from  './TeamCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    brandName:{
      fontFamily: "'Grenze Gotisch', cursive",
    },
    
   // necessary for content to be below app bar
    toolbar:theme.mixins.toolbar,
    
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      }
  }));




function TeamInfo()
{   
    const classes=useStyles();
    const [hasTeam,setHasTeam] = useState(false) ;
    const [teamData,setTeamData]=useState([]);
    const [searchForm,setSearchForm] = useState({
        teamName:"",
        sport:""

    });


    const[dialogOpen,setDialogOpen]=useState(false);
    const[isFetching,setIsFetching]=useState(true);

const fetchTeam = async () =>{
const apiCall= await fetch('http://localhost:5000/team-info');
const team =await apiCall.json();
console.log(team);
setTeamData(...team.teams);
setIsFetching(false);
if(team.hasTeam==true){
  setHasTeam(true);
}

}

    useEffect(
      
        ()=>{
          
          fetchTeam();
         } ,[]
     );


   

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

     function joinTeam()
     {}
 
     const noTeam =(
         <div>
         <div>
         <Typography variant="h5">
                Join A Team
            </Typography>
        <form style={{padding:"3%"}}>
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
          <Button onClick={joinTeam} color="primary">
           Join
          </Button>
        </DialogActions>
      </Dialog>
</div>
                    
            </form>
         </div>
            
         
            <Divider />
           
            
          <div>

          </div>
          <Typography variant="h5">
               Create A Team
            </Typography>
            <form style={{padding:"3%"}}>
                <TextField label="Team Name" variant="outlined"/>

                
            </form>

         </div>
     );
    
// function TeamTable(props)
// {
//   return(
//     <Typography variant="h6">TeamName:{props.teamData.teamName}</Typography>
    

//   );

// }

    return (
       
        <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          isFetching ?<div><CircularProgress /></div> :
          <div>
        { hasTeam ?
        <li>  my teams  </li>  
       
         : noTeam
        }
        </div>

        }
       
        
      </main>
    </div>

       
        
    );

}

export default TeamInfo ; 