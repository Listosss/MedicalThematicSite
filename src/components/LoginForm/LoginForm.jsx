import React, { useState, useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './LoginForm.css'

export function LoginForm() {
    const {login} = useContext(AuthContext);

    const inputRef = useRef()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(inputRef.current) inputRef.current.focus()
    },[])

    const handleSubmit =(e)=>{
        e.preventDefault()
        if(!username || !password){
            alert('Please, fill all fields')
            return
        }
        login(username, password);
    }
    return (
        <form className='login_form'>
            <h1 className='login_title'>Log in to your account</h1>
            <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} ref={inputRef}/>
            <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='submit' value={'Login'} onClick={handleSubmit}></input>
        </form>
    )
}
