import React from 'react'
import { useParams } from 'react-router-dom'
import './ProjectDetail.css'
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjecrComment from './ProjecrComment';

export default function ProjectDetail() {
    const { id } = useParams();
    const { error, document } = useDocument('projects', id);

    if (error) return <div className='error'>{error}</div>

    if (!document) return <div className='loading'>Loading...</div>

    return (
        <div className='project-details'>
            <ProjectSummary project={document} />
            <ProjecrComment project={document} />
        </div>
    )
}
