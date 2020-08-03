import React, { Component } from 'react';
import Axios from 'axios';
import classnames from 'classnames'

class Register extends Component {
   state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      loading: false,
      errors: {}
   }

   // handle controlled change
   handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
   }


   // handling submit action
   handleSubmit = (event) => {
      this.setState({ loading: true })
      const { name, email, password, password2 } = this.state

      event.preventDefault()
      Axios.post('http://localhost:5000/api/users/register', { name, email, password, password2 })
         .then(result => {
            this.setState({ loading: false })
            console.log(result.data)
         })
         .catch(err => {
            this.setState({ loading: false })
            this.setState({ errors: err.response.data })
         })
   }



   render() {
      const { name, email, password, password2, loading, errors } = this.state
      return (
         <div className="register">
            {loading && <span>loading</span>}
            <div className="container">
               <div className="row">
                  <div className="col-md-5 m-auto">
                     <div className="text-center register-icon">
                        <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-command" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 0 0 3.5 5H5V3.5a1.5 1.5 0 1 0-3 0zM6 6V3.5A2.5 2.5 0 1 0 3.5 6H6zm8-2.5A1.5 1.5 0 0 1 12.5 5H11V3.5a1.5 1.5 0 0 1 3 0zM10 6V3.5A2.5 2.5 0 1 1 12.5 6H10zm-8 6.5A1.5 1.5 0 0 1 3.5 11H5v1.5a1.5 1.5 0 0 1-3 0zM6 10v2.5A2.5 2.5 0 1 1 3.5 10H6zm8 2.5a1.5 1.5 0 0 0-1.5-1.5H11v1.5a1.5 1.5 0 0 0 3 0zM10 10v2.5a2.5 2.5 0 1 0 2.5-2.5H10z" />
                           <path fill-rule="evenodd" d="M10 6H6v4h4V6zM5 5v6h6V5H5z" />
                        </svg>
                     </div>
                     <p className="lead text-center">Create a Dev-Hub account for free</p>
                     <form noValidate onSubmit={this.handleSubmit}>
                        <div className="form-group">
                           <input type="text" className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.name
                           })} placeholder="Name" name="name" value={name} onChange={this.handleChange} />
                           {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="form-group">
                           <input type="email" className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.email
                           })} placeholder="Email Address" name="email" value={email} onChange={this.handleChange} />
                           {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                           <small classNameName="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                        </div>
                        <div className="form-group">
                           <input type="password" className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.password
                           })} placeholder="Password" name="password" value={password} onChange={this.handleChange} />
                           {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="form-group">
                           <input type="password" className={classnames('form-control form-control-lg', {
                              'is-invalid': errors.password2
                           })} placeholder="Confirm Password" name="password2" value={password2} onChange={this.handleChange} />
                           {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                        </div>
                        <input type="submit" value="register" className="btn btn-primary btn-block mt-4" />
                     </form>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default Register;
