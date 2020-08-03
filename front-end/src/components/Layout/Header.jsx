import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
   render() {
      return (
         <nav className="navbar fixed-top navbar-expand-sm navbar-dark bg-primary  mb-4">
            <div className="container">
               <Link className="navbar-brand bold" to="/">
                  <span className="mr-2"><svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-code-slash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                     <path fill-rule="evenodd" d="M4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0zm-.999-3.124a.5.5 0 0 1 .33.625l-4 13a.5.5 0 0 1-.955-.294l4-13a.5.5 0 0 1 .625-.33z" />
                  </svg></span>
                  <span>Dev-Hub</span></Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                  <span className="navbar-toggler-icon"></span>
               </button>
               <div className="collapse navbar-collapse" id="mobile-nav">
                  <ul className="navbar-nav ml-auto">
                     <li className="nav-item active">
                        <Link className="nav-link" to="/engneers">
                           <div className="text-center">
                              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-person-lines-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm2 9a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                              </svg>
                           </div>
                           <div>
                              Engneers
                           </div>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/about">
                           <div className="text-center">
                              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-file-earmark-spreadsheet-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" d="M2 3a2 2 0 0 1 2-2h5.293a1 1 0 0 1 .707.293L13.707 5a1 1 0 0 1 .293.707V13a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm7 2V2l4 4h-3a1 1 0 0 1-1-1zM3 8v1h2v2H3v1h2v2h1v-2h3v2h1v-2h3v-1h-3V9h3V8H3zm3 3V9h3v2H6z" />
                              </svg>
                           </div>
                           <div>
                              About
                     </div>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/register">
                           <div className="text-center">
                              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-command" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 0 3.5 5H5V3.5a1.5 1.5 0 1 0-3 0zM6 6V3.5A2.5 2.5 0 1 0 3.5 6H6zm8-2.5A1.5 1.5 0 0 1 12.5 5H11V3.5a1.5 1.5 0 0 1 3 0zM10 6V3.5A2.5 2.5 0 1 1 12.5 6H10zm-8 6.5A1.5 1.5 0 0 1 3.5 11H5v1.5a1.5 1.5 0 0 1-3 0zM6 10v2.5A2.5 2.5 0 1 1 3.5 10H6zm8 2.5a1.5 1.5 0 0 0-1.5-1.5H11v1.5a1.5 1.5 0 0 0 3 0zM10 10v2.5a2.5 2.5 0 1 0 2.5-2.5H10z" />
                                 <path fill-rule="evenodd" d="M10 6H6v4h4V6zM5 5v6h6V5H5z" />
                              </svg>
                           </div>
                           <div>
                              register
                           </div>
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link className="nav-link" to="/login">
                           <div className="text-center">
                              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-key-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                 <path fill-rule="evenodd" d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                              </svg>
                           </div>
                           <div>
                              Login
                     </div>
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </nav>

      )
   }
}

export default Header;
