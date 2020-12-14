import React,{useEffect,useState,forwardRef} from 'react';
import 
{ Card,CardActions,Button,CardContent,
  List,
  ListItem,
    Typography,
    Dialog,
    Slide,
    Paper,
    Grid,
 } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import NavbarProfile from '../components/NavbarProfile';
import ImageTitle from '../components/ImageTitle';
import Loading from './Loading';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
      captain:"",
      players:[]
    });

const handleClickOpenDialog = (teamName,captain,players) => {
 setdialogData({
   teamName:teamName,
captain:captain,
    players:[...players]
 })
  setOpenTeamDialog(true);
};

const handleCloseDialog = () => {

  setOpenTeamDialog(false);
  
};

    useEffect(
      
        ()=>{
          
          axios.get("http://localhost:5000/team-info",{
            params:{
              userId:localStorage.getItem("userId")
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
              var arr=res.data.teams.map((item)=>{
                return ({
                  ...item,
                  id:uuidv4()
                })

              });
             
             setTeamData(arr);
            }
            

            
          })



         } ,[]
     );



   function handleExit(exit)
   {

     var newTeams= teamData.filter((item)=>{
        return (exit.id!=item.id);
     });

     setTeamData(newTeams);

     axios.post("http://localhost:5000/exit-team",{
       ...exit,
       userId:localStorage.getItem("userId")
     })
     .then((res)=>{
       console.log(res);
     }).catch(err=>{
       console.log(err);
     })
    


   }

   function handleViewDetails(detail)
   {


    axios.post("http://localhost:5000/team-details",detail)
    .then((res)=>{
      handleClickOpenDialog(detail.name,detail.captain,res.data.players)
    }).catch(err=>{
      console.log(err);
    })

   }
    

  
   

    

    
    



    return (
       
        <div className={classes.root}>
      <NavbarProfile isMyTeam={true}/>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Paper style={{padding:"2%"}}>
        <ImageTitle title="MY TEAMS"/>

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
             
              <Card style={{minWidth:"100%",padding:"1%"}} >
           
        <CardContent>
        <Grid container>
        <Grid item xs={12} md={4}>
        <Typography gutterBottom variant="h5" component="h2"> {team.name}</Typography>
        </Grid>
        <Grid item  xs={12} md={4}>
         <Typography variant="h6" color="textSecondary" ><b>Sport:</b> {team.sports}</Typography>
         </Grid>
        <Grid item xs={12} md={4}>
         <Typography variant="h6"  color="textSecondary" ><b>Captain:</b> {team.captain}</Typography>
         </Grid>
         
        </Grid>
      </CardContent>
        <CardActions>
        <Grid container alignItems="center" justify="center">
        <Grid item  md={6}><Button onClick={()=>{handleExit(team)}} style={{backgroundColor:"#f44336",color:"white"}}>Exit From Team</Button></Grid>
        <Grid item md={6}> <Button onClick={()=>{ handleViewDetails(team)} } style={{backgroundColor:"black",color:"white"}}>View Details</Button></Grid>
        </Grid>
       
      
        </CardActions></Card>
             
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
      </Paper>
      </main>
    </div>


       
        
    );

}

export default TeamInfo ; 