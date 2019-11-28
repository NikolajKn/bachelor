import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navigation';
import Dashboard from './components/dashboard/Dashboard';
import ToDo from './components/todo/ToDo';
import SignIn from './components/auth/SignIn.js';
import SignUp from './components/auth/SignUp.js';
import ToDoCreate from './components/todo/ToDoCreate.js';




class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path ="/" component = {Dashboard} />
            <Route path = "/todo/:id" component={ToDo}/>
            <Route path = "/signin" component={SignIn}/>
            <Route path = "/signup" component={SignUp}/>
            <Route path = "/todocreate" component={ToDoCreate}/>
          </Switch>
        </div>
      </BrowserRouter>
   
    )
  }
}

export default App;
