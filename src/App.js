import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import AddListing from './AddListing';
import EditListing from './EditListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/addlisting" component={AddListing} />
          <PrivateRoute path="/editlisting/:id" component={EditListing} />
          <PrivateRoute exact path="/dashboard/:id" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
