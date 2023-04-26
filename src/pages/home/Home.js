import React, { useState } from 'react'
import './Home.css';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext'
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';

export default function Home() {
    const { documents, error } = useCollection('projects');
    const [currentFilter, setCurrentFilter] = useState('all');
    const { user } = useAuthContext();

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true
            case 'in charge':
                let assignedToMe = false;
                document.assignedUsersList.forEach((u) => {
                    if (user.uid === u.id) assignedToMe = true
                })
                return assignedToMe
            case 'development':
            case 'design':
            case 'sales':
            case 'marketing':
                return document.category === currentFilter
            default:
                return true
        }
    }) : null;

    return (
        <div>
            <h2 className='page-title'>Current Projecst</h2>
            {error && <p className='error'><small>{error}</small></p>}
            {documents && (
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                />
            )}
            {projects && <ProjectList projects={projects} />}
        </div>
    )
}
