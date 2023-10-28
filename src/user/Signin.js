import React from 'react'
import Layout from '../pages/Layout';
import { useState } from 'react';
import { signinAPI, authenticate, isAuthenticated } from '../auth/index';
import { Navigate } from "react-router-dom"; 


const Signin = () => {

    const [values,setValues] = useState({

      email: 'equus@equus.com',
      password: 'FfM2024',
      error: '',
      loading: false,
      redirectToReferrer:false

    });

const {email, password, error, loading, redirectToReferrer} = values;    
const {user} = isAuthenticated();


function handleChange(name) {

      return function(e) { 

          setValues({...values, error: false, [name]:e.target.value})
      }
  }

const clickSubmit = (e) => {

    e.preventDefault();
    setValues({...values,error:false})
    signinAPI({email,password})
    .then(data => {

      if(data.error) {

        setValues({...values, error:data.error, loading:false});
      }
      else {

       authenticate(data, ()=> {
           setValues({
          ...values, 
          redirectToReferrer: true   
        
        })

       })
      }

    });

} 


  const signInForm = () => (
    
      <form>
      
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('password')} type="password" className="form-control"
            value={password}/>
        </div>

         <button onClick={clickSubmit} className='btn btn-primary'>
                Submit

         </button>

      </form>
  )

  const showError = () => (

       <div className='alert alert-danger' style={{display:error ? '' : 'none'}}>

          {error}
       </div>
  )

   const showLoading = () => {

      if(loading) { 
        
       return <div className='alert alert-info'><h2>Loading...</h2></div>

      } 
      
      }

   const redirectUser = () => {

        if(redirectToReferrer)  {

          if(user && user.role === 1) {

             return <Navigate to="/admin/dashboard" replace/>
          }

          else  {

             return <Navigate to="/user/dashboard" replace/>
          }

        }
        if(isAuthenticated()) {
              return <Navigate to="/" replace/>

        }
   }

    return(
      <Layout title="Signin" 
              description="Node React E-commerce App"
              className="container col-md-8 offset-md-2"
              >

        {showLoading()}
        {showError()}
        {signInForm()}
        {redirectUser()}
      

      </Layout>
    )

    }
export default Signin;
    
