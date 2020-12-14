import React from 'react';
import {AppBar,
  Toolbar,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import {makeStyles,withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import ImageTitle from './ImageTitle';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
      backgroundColor:"black"
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    table: {
      minWidth: 700,
    },
  }));


  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


  function createData(sr, userId, fname, lname, contact,email) {
    return { sr,userId , fname, lname, contact ,email};
  }





function SelectedTeam(props)
{
    console.log(props.players);

    const rows=props.players.map((item,index)=>{
      return(
        createData(index+1,item.userId,item.fname,item.lname,item.contact,item.email)
      );
     

    });

const classes= useStyles();
return(
    <div>
  <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={props.closeFunc} aria-label="close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
         {props.teamName}
        </Typography>
        
        
      </Toolbar>
    </AppBar>
    <Paper style={{padding:"2%",width:"90%",margin:"20px auto"}}>
    <ImageTitle title="TEAM DETAILS"/>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr No.</StyledTableCell>
            <StyledTableCell align="right">User&nbsp;ID</StyledTableCell>
            <StyledTableCell align="right">First&nbsp;Name</StyledTableCell>
            <StyledTableCell align="right">Last&nbsp;Name</StyledTableCell>
            <StyledTableCell align="right">Contact&nbsp;No.</StyledTableCell>
            <StyledTableCell align="right">Email&nbsp;ID</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.sr}>
              <StyledTableCell component="th" scope="row">
                {row.sr}
              </StyledTableCell>
              <StyledTableCell align="right">{row.userId}</StyledTableCell>
              <StyledTableCell align="right">{row.fname}</StyledTableCell>
              <StyledTableCell align="right">{row.lname}</StyledTableCell>
              <StyledTableCell align="right">{row.contact}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>
    </div>
  
  

);


}

export default SelectedTeam;











//  function CustomizedTables() {
//   const classes = useStyles();

//   return (
//     <TableContainer component={Paper}>
//       <Table className={classes.table} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//             <StyledTableCell align="right">Calories</StyledTableCell>
//             <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.calories}</StyledTableCell>
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }