import React, { Component } from 'react'

class Login extends Component {

   state = {

      email: "",
      password: "",
      errors: ""
   }

   // handle controlled change
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }


   // handling submit action
   handleSubmit = (event) => {
      this.setState({ loading: true })
      const { email, password } = this.state
      event.preventDefault()

   }

   render() {
      const { name, email, password, loading, errors } = this.state
      return (
         <div className="login">
            <div className="container">
               <div className="row">
                  <div className="col-md-5 m-auto">
                     <div className="text-center login-icon">
                        <svg className="login-icon" width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-key-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                        </svg>
                     </div>
                     <p className="lead text-center">Sign in to your Dev-Hub account</p>
                     <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                           <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" onChange={this.handleChange} value={email} />
                        </div>
                        <div className="form-group">
                           <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                        </div>
                        <input type="submit" value="Login" className="btn btn-primary btn-block mt-4" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
export default Login;
