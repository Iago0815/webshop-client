import React, { Fragment } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { signOut, isAuthenticated } from "../auth"


//https://www.geeksforgeeks.org/reactjs-usenavigate-hook/

const isActive = (path, { pathname }) => {


    if (path === pathname) {

        return { color: '#ff9900' }
    } else {

        return { color: '#000000' }
    }
}

export default function Menue() {

    const location = useLocation();
    const navigate = useNavigate();

    return (

        <div>
            <ul className="nav nav-tabs">

                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/', location)} to="/">Home</Link>

                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive('/user/dashboard', location)} to="/user/dashboard">Dashboard</Link>

                    </li>

                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive('/admin/dashboard', location)} to="/admin/dashboard">Dashboard</Link>

                    </li>
                )}

                {!isAuthenticated() && (

                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive('/signin', location)} to="/signin">Signin</Link>

                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive('/signup', location)} to="/signup">Signup</Link>

                        </li>
                    </Fragment>

                )}

                {isAuthenticated() && (


                    <li className="nav-item">
                        <span onClick={() => signOut(() => {

                            return navigate('/')
                        })}

                            className="nav-link" style={{ cursor: 'pointer', color: '#000000' }} >Signout</span>

                    </li>)}
            </ul>



        </div>
    );
}