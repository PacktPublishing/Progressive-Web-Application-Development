import React from "react";
import logo from './logo.svg';
import { Link } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path='/' component={Home}/>
    <Route path='/About' component={About}/>
  </Switch>
);

const Home = () => (
  <div className="container">
    <div style={{ textAlign: 'center' }}>
      <h1>
        Welcome to React!
      </h1>
      <img src={logo} width="300" className="App-logo" alt="React PWA"/>
    </div>
    <div className="alert alert-success" role="alert">
      <h4 className="alert-heading">Well done!</h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a
        bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <hr/>
      <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
    <Link to="/about" className="btn btn-primary">GO TO ABOUT</Link>
  </div>
);

const About = () => (
  <div className='container'>
    <div className='alert alert-warning' role='alert'>
      <h4 className='alert-heading'> About! </h4>
      <p>Aww yeah, you successfully read this important alert message. This example text is going to run a
        bit longer so that you can see how spacing within an alert works with this kind of content.</p>
      <hr/>
      <p className='mb-0'>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
    </div>
    <Link to='/' className='btn btn-primary'>GO TO HOME</Link>
  </div>
);

export default App;
