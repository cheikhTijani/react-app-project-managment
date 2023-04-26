import React from 'react'
import './Navbar.css'
import logo from '../assets/teamLogo.svg';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={logo} alt="website logo" />
                    <span>The Project</span>
                </li>
                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                    </>
                )
                }
                {user && <li>
                    <button onClick={logout} className='btn'>Logout</button>
                </li>
                }
            </ul>
        </div>
    )
}
