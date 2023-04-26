import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from '../../hooks/useFirestore';
import Avatar from '../../components/Avatar';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ProjecrComment({ project }) {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuthContext();
    const { state, updateDocument } = useFirestore('projects');

    const handleSumbit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuidv4()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!state.error) setNewComment('');
    }
    return (
        <div className='project-comments'>
            <h4>Comments</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-author'>
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className='comment-content'>
                            <p>{comment.content}</p>
                        </div>
                        <div className='comment-date'>
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form className='add-comment' onSubmit={handleSumbit}>
                <label>
                    {/* <span>New Comment</span> */}
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                        placeholder='Add new comment'
                    ></textarea>
                </label>
                <button className='btn'>Add Comment</button>
            </form>
        </div>
    )
}
