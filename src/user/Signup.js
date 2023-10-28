import React from 'react'
import Layout from '../pages/Layout';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { signupAPI } from '../auth/index';



const Signup = () => {

    const [values,setValues] = useState({

      name: '',
      email: '',
      pawword: '',
      error: '',
      success: false


    });

const {name, email, password, success, error} = values;    


function handleChange(name) {

      return function(e) { 

          setValues({...values, error: false, [name]:e.target.value})
      }
  }

const clickSubmit = (e) => {

    e.preventDefault();
    setValues({...values,error:false})
    signupAPI({name,email,password})
    .then(data => {

      if(data.error) {

        setValues({...values, error:data.error, success:false});
      }
      else {

        setValues({...values, name: '', email: '', password: '', success: true})

      }

    });

    console.log(name,email,password);

} 


  const  signUpForm = () => (
    
      <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
        </div>
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

   const showSuccess = () => (

       <div className='alert alert-info' style={{display:success ? '' : 'none'}}>

         New account id created. Please <Link className="nav-link" to="/signin">Signin</Link>
       </div>
   )

    return(
      <Layout title="Signup" 
              description="Node React E-commerce App"
              className="container col-md-8 offset-md-2"
              >

        {showSuccess()}
        {showError()}
        {signUpForm()}
      

      </Layout>
    )
}

export default Signup;