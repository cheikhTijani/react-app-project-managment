const filterList = ['all', 'development', 'design', 'marketing', 'sales', 'in charge'];


export default function ProjectFilter({ currentFilter, changeFilter }) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter);
    }
    return (
        <div className="project-filter">
            <nav>
                <p>filter by:</p>
                {filterList.map(filter => (
                    <button
                        key={filter}
                        onClick={() => handleClick(filter)}
                        className={currentFilter === filter ? 'active' : ''}
                    >
                        {filter}
                    </button>
                ))}
            </nav>

        </div>
    )
}
