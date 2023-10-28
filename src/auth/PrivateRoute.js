import React from 'react'
import { Navigate } from "react-router-dom"
import { isAuthenticated } from '.'

 ;

const PrivateRoute = ({children}) => {

    if(!isAuthenticated()) {

        return <Navigate to="/signin" replace/> 
    }
    return children
}





// ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => isAuthenticated() ? (
//                 <Component {...props} />
//             ) : (
//                 <Navigate
//                     to={{
//                         pathname: "/signin",
//                         state: { from: props.location }
//                     }}
//                 />
//             )
//         }
//     />
// );

export default PrivateRoute;


