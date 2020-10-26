import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';


function App() {
  return (
  <Router>

  <Switch>
  <Route path="/" exact component={Home}/>
  <Route path="/login" component={Login}  />
  <Route path="/register" component={Register}/>
  </Switch>

  </Router>
     
   
  );
}

export default App;
