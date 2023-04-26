import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import './Create.css';
import { useCollection } from '../../hooks/useCollection';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
    const { addDocument, state } = useFirestore('projects');

    const { documents } = useCollection('users');
    const [members, setMembers] = useState([]);
    const { user } = useAuthContext();

    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [assignedUsers, setAssignedUsers] = useState([]);
    const [formError, setFormError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setMembers(options)
        }
    }, [documents])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        if (!category) {
            setFormError('Please select a project category');
            return;
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least one user');
            return;
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((assigned) => {
            return {
                displayName: assigned.value.displayName,
                photoURL: assigned.value.photoURL,
                id: assigned.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }

        await addDocument(project);

        if (!state.error) {
            navigate('/');
        }
    }

    return (
        <div className='create-form'>
            <h2 className='page-title'>Create a new Project</h2>
            <form onSubmit={handleSubmit}>
                {formError && <p className='error'><small>{formError}</small></p>}
                <label>
                    <span>Project Name</span>
                    <input
                        type='text'
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </label>
                <label>
                    <span>Project Details</span>
                    <textarea
                        type='text'
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                        required
                    ></textarea>
                </label>
                <label>
                    <span>Due Date</span>
                    <input
                        type='date'
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        required
                    />
                </label>
                <label>
                    <span>Project Category</span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        options={categories}
                    />
                </label>
                <label>
                    <span>Assigned to</span>
                    <Select
                        onChange={(option) => setAssignedUsers(option)}
                        options={members}
                        isMulti
                    />
                </label>
                <button className='btn'>Add Project</button>
            </form>
        </div>
    )
}
