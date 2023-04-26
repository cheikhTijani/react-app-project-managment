import React from 'react'
import './Sidebar.css';

import homeIcon from '../assets/dashboard_icon.svg';
import addIcon from '../assets/add_icon.svg';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import { useAuthContext } from '../hooks/useAuthContext';


export default function Sidebar() {
    const { user } = useAuthContext();
    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='user'>
                    <Avatar src={user.photoURL} />
                    <p>{user.displayName}</p>
                </div>
                <nav className='links'>
                    <ul>
                        <li>
                            <NavLink exact="true" to="/">
                                <img src={homeIcon} alt='home icon' />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to="/create">
                                <img src={addIcon} alt='add icon' />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
