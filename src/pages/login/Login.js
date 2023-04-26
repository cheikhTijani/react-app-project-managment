import React, { useState } from 'react'
import './Login.css'
import { useLogin } from '../../hooks/useLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, error, loading } = useLogin();


    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }
    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className='error'><small>{error}</small></p>}
            <label>
                <span>Email</span>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>
            <label>
                <span>Password</span>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>
            {!loading && <button className='btn'>Login</button>}
            {loading && <button className='btn' disabled>Loading...</button>}
        </form>
    )
}
