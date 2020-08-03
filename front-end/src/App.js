import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';



import './App.css';
import Header from './components/Layout/Header';
import Landing from './components/Layout/Landing';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import About from './components/About/About';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route component={Landing} path="/" exact />
        <div className="conatiner">
          <Route component={Login} path="/login" exact />
          <Route component={Register} path="/register" exact />
          <Route component={About} path="/about" exact />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
