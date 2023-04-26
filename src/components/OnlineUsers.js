import React from 'react'
import './OnlineUsers.css'
import { useCollection } from '../hooks/useCollection'
import Avatar from './Avatar'

export default function OnlineUsers() {
    const { error, documents } = useCollection('users')
    return (
        <div className='user-list'>
            <h2>Members</h2>
            {error && <p className='error'>{error}</p>}
            {documents && documents.map(user => (
                <div key={user.id} className='user-list-item'>
                    {user.online && <span className='online'></span>}
                    <span className='name'>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}
