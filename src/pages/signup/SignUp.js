import React, { useState } from 'react'
import './SignUp.css'
import { useSignUp } from '../../hooks/useSignUp';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [fileError, setFileError] = useState(null);

    const { signup, loading, error } = useSignUp();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim() || !displayName.trim() || !thumbnail) return;

        signup(email, password, displayName, thumbnail);
    }

    const handleFileChange = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
        if (!selected) {
            setFileError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setFileError('Please select an image file (png or jpg)')
            return
        }

        if (selected.size > 100000) {
            setFileError('The image size must not exceed 100kb')
            return
        }

        setFileError(null)
        setThumbnail(selected)

    }


    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            {error && <p className='error'><small>{error}</small></p>}
            <label>
                <span>Name</span>
                <input type='text' onChange={(e) => setDisplayName(e.target.value)} value={displayName} required />
            </label>
            <label>
                <span>Email</span>
                <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} required />
            </label>
            <label>
                <span>Password</span>
                <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} required />
            </label>
            <label>
                <span>Profile Picture</span>
                <input type='file' required onChange={handleFileChange} />
                {fileError && <div className='error'><small>{fileError}</small></div>}
            </label>
            {!loading && <button className='btn'>Sign Up</button>}
            {loading && <button className='btn' disabled>Loading...</button>}
        </form>
    )
}
