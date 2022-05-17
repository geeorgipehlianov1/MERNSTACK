import React from 'react'
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const { login, error, clearErrors, isAuthenticated } = authContext; 
    const {setAlert} = alertContext;


    const { email, password, } = user;
    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(error === 'Invalid Credentials') {
            setAlert(error, 'danger')
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated, props.history])

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    } 

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(email === '' || password === '') {
            setAlert('Please fill all fields')
        } else {
            console.log(email, password);
            login({email, password});
        }
       
    }


  return (
    <div className='form-container'>
        <h1>
            Account <span className='text-primary'>Login</span>
        </h1>
        <form onSubmit={onSubmitHandler}>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} onChange={onChangeHandler}/>
            </div>
            <input type="submit" value='Login'  className='btn btn-primary btn-block'/>
        </form>
    </div>
  )
}

export default Login;