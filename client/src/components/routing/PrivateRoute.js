import React from 'react'
import {useContext} from 'react'
import { Route, Redirect } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => { 
    const authContext = useContext(AuthContext)
    const { isAuthenticated} = authContext;
  return (
    <Route {...rest} {...isAuthenticated === false ? (
        <Redirect to='/login' />
    ):(
        <Component {...rest} />
    )}/>
  )
}

export default PrivateRoute;
