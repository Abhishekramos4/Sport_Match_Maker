import React,{useEffect,useState,forwardRef} from 'react';
import 
{Button,
  Card,CardActionArea,CardContent, 
  List,
  ListItem,
    Typography,
    Dialog,
    Slide,
  CircularProgress} from '@material-ui/core';
  import CloseIcon from '@material-ui/icons/Close'
import {makeStyles,useTheme} from '@material-ui/core/styles'
import NavbarProfile from '../components/NavbarProfile';
import TeamCard from  './TeamCard';
import Loading from './Loading';
import axios from 'axios';
import SelectedTeam from './SelectedTeam';
import { Link } from 'react-router-dom';

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

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function TeamInfo()
{   
    const classes=useStyles();
    const [hasTeam,setHasTeam] = useState(false) ;
    const [teamData,setTeamData]=useState([]);
    


   
    const[isFetching,setIsFetching]=useState(true);
    const [openTeamDialog, setOpenTeamDialog] = useState(false);
    const [dialogData,setdialogData]=useState({
      teamName:"",
      players:[]
    });
const handleClickOpenDialog = (teamName,players) => {
 setdialogData({
   teamName:teamName,
    players:[...players]
 })
  setOpenTeamDialog(true);
};

const handleCloseDialog = () => {

  setOpenTeamDialog(false);
  
};

// const fetchTeam = async () =>{
// const apiCall= await fetch('http://localhost:5000/team-info');
// const team =await apiCall.json();
// console.log(team);
// setTeamData(team.teams);
// setIsFetching(false);
// if(team.hasTeam==true){
//   setHasTeam(true);
// }

// }

    useEffect(
      
        ()=>{
          
          axios.get("http://localhost:5000/team-info",{
            params:{
              userId:"ab123"
            }
          }).then((res)=>{
            console.log(res.data);
            setIsFetching(false);
            if(res.data.hasTeam===false)
            {
              setHasTeam(false);
            }
            else{

              setHasTeam(true);
              setTeamData(res.data.teams);
            }
            

            
          })



         } ,[]
     );



   
    

  
   

    

    
    



    return (
       
        <div className={classes.root}>
      <NavbarProfile/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          isFetching ?<Loading/> :
          <div>
        { hasTeam ?
        <div>
        <List>
        {
           teamData.map((team,index)=>{
           return(
            
             <ListItem key={index}>
              <TeamCard teamName={team.name} sport={team.sports}  openFunc={handleClickOpenDialog}/>
              {/* <Typography>{team.name}</Typography> */}
             </ListItem>
         
            
            
             );
           
          
         })
        
        }
        </List>
         <Dialog fullScreen open={openTeamDialog} onClose={handleCloseDialog} TransitionComponent={Transition} >
       <SelectedTeam teamName={dialogData.teamName} players={dialogData.players} closeFunc={handleCloseDialog} />
         </Dialog>
        </div>
        
       
         :
         <div>
           <Typography>You Have No Teams</Typography>
           <Link to="/join-team"><Typography>Click Here to Join a Team or Create New Team</Typography></Link>
        </div>

        }
       
        </div>
        }
      
      </main>
    </div>


       
        
    );

}

export default TeamInfo ; 