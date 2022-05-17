import React from 'react'
import { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { register, error, clearErrors, isAuthenticated } = authContext; 

    const {setAlert} = alertContext;

    useEffect(() => {
        if(isAuthenticated) {
            props.history.push('/')
        }

        if(error === 'User already exists!') {
            setAlert(error, 'danger')
            clearErrors();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })
    
    const {name, email, password, password2} = user;

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    } 

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('All fields are required!', 'danger')
        } else if(password !== password2) {
            setAlert('Passwords dont\'t match!')
        } else {
           register({name, email, password})
        }
    }


  return (
    <div className='form-container'>
        <h1>
            Account <span className='text-primary'>Register</span>
        </h1>
        <form onSubmit={onSubmitHandler}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" value={name} onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type="email" name="email" value={email} onChange={onChangeHandler}/>
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type="password" name="password" value={password} onChange={onChangeHandler} minLength='6'/>
            </div>
            <div className='form-group'>
                <label htmlFor='password2'>Repeat Password</label>
                <input type="password" name="password2" value={password2} onChange={onChangeHandler} minLength='6'/>
            </div>
            <input type="submit" value='Register'  className='btn btn-primary btn-block'/>
        </form>
    </div>
  )
}

export default Register;