import React from 'react';

interface Visit {
    id: number;
    address: string;
    neighborhood: string;
    cityState: string;
    lastModified: string;
    conclusionDate?: string;
    isPending: boolean;
    isSelected: boolean;
}

interface VisitListProps {
    visits: Visit[];
    toggleSelection: (id: number) => void;
    openEditModal: (id: number) => void;
}

const VisitList: React.FC<VisitListProps> = ({ visits, toggleSelection, openEditModal }) => {
    return (
        <div style={{ padding: '1rem' }}>
            {visits.map(visit => (
                <div 
                    key={visit.id} 
                    style={{ 
                        marginBottom: '1rem', 
                        padding: '1rem', 
                        border: '1px solid #ccc', 
                        backgroundColor: visit.conclusionDate ? '#f0f0f0' : '#fff' 
                    }}
                >
                    <p>{visit.address}</p>
                    <p>{visit.neighborhood}</p>
                    <p>{visit.cityState}</p>
                    <p>{visit.lastModified}</p>
                    {visit.conclusionDate && <p>Concluded: {visit.conclusionDate}</p>}
                    <input 
                        type="checkbox" 
                        checked={visit.isSelected} 
                        onChange={() => toggleSelection(visit.id)} 
                    />
                    <button 
                        onClick={() => openEditModal(visit.id)} 
                        disabled={!visit.isPending}
                    >
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
};

export default VisitList;