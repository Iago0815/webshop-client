import { API } from '../config';


export const signupAPI = (user) =>{

     return fetch(`${API}/signup`, {

      method: "POST",
      headers : {
          Accept: 'application/json',
          "Content-Type": "application/json"
      },
      body : JSON.stringify(user)
      
    }).then(res => {

      return res.json()
    }).catch(err => {

      console.log(err)
    })
}

export const signinAPI = (user) =>{

     return fetch(`${API}/signin`, {

      method: "POST",
      headers : {
          Accept: 'application/json',
          "Content-Type": "application/json"
      },
      body : JSON.stringify(user)
      
    }).then(res => {

      return res.json()
    }).catch(err => {

      console.log(err)
    })
}

export const authenticate = (data,next) => {

  if(typeof window !== 'undefined') {

    localStorage.setItem('jwt', JSON.stringify(data))

    next();
  }
}

export const signOut = (next) => {

      if(typeof window !== 'undefined') {
         localStorage.removeItem('jwt')
       
        next();
      
      }

}

export const isAuthenticated = () => {

     if(typeof window == 'undefined') {
        
       return false;

   }
   if(localStorage.getItem('jwt')) {

      return JSON.parse(localStorage.getItem('jwt'))
   } else {

    return false;
   }
}

