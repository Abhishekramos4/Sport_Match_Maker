import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import TeamInfo from './components/TeamInfo';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';
import NavbarMain from './components/NavbarMain';


function App() {
  return (
  <Router>

  <Switch>
  <Route path="/" exact component={Home}/>
  <Route path="/login" component={Login}  />
  <Route path="/register" component={Register}/>
  <Route path="/profile"  component={Profile}/>
  <Route path="/my-team"  component={TeamInfo}/>
  </Switch>

  </Router>
     
   
  );
}

export default App;
