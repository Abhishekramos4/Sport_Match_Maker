import React, { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import TeamInfo from './components/TeamInfo';
import InterestedSports from './components/InterestedSports';
import GroundsNearMe from './components/GroundsNearMe';
import  Error404 from './components/Error404';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import GroundNearMe from './components/GroundsNearMe';



function App() {
  
  
  
  const[userToken,setUserToken]=useState("");

  function handleUserToken(userToken)
  {
      localStorage.setItem("userToken", userToken);
      setUserToken(userToken);
  }
  return (
  <Router>

  <Switch>
  <Route path="/" exact component={Home}/>
  <Route path="/login" render={(props) => <Login {...props} userToken={userToken} handleUserToken={handleUserToken} />} />
  <Route path="/register" component={Register}/>
  <Route path="/profile"  component={Profile}/>
  <Route path="/my-team"  component={TeamInfo}/>
  <Route path="/interested-sports"  component={InterestedSports}/>
  <Route path="/grounds-near-me" component={GroundsNearMe}/>

  <Route path="*" component={Error404}/>
  </Switch>

  </Router>
     
   
  );
}

export default App;
