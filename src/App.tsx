import React, { useState } from 'react';
import Header from './pages/home/components/Header/Header';
import Footer from './pages/home/components/Footer/Footer';
import VisitList from './pages/home/components/VisitList/VisitList';
import CreateModal from './pages/home/components/CreateModal/CreateModal';

const App: React.FC = () => {
    const [visits, setVisits] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingVisit, setEditingVisit] = useState<any>(null);

    const addOrEditVisit = (data: any) => {
        if (editingVisit) {
            setVisits(prev => prev.map(v => v.id === editingVisit.id ? { ...v, ...data } : v));
        } else {
            setVisits(prev => [...prev, { ...data, id: Date.now(), isPending: true, isSelected: false }]);
        }
        setEditingVisit(null);
    };

    const toggleSelection = (id: number) => {
        setVisits(prev => prev.map(v => v.id === id ? { ...v, isSelected: !v.isSelected } : v));
    };

    const concludeSelected = () => {
        setVisits(prev => prev.map(v => v.isSelected && v.isPending ? { ...v, isPending: false, conclusionDate: new Date().toISOString() } : v));
    };

    return (
        <div>
            <Header
                pendingCount={visits.filter(v => v.isPending).length} 
                openModal={() => setModalOpen(true)} 
            />
            <VisitList 
                visits={visits} 
                toggleSelection={toggleSelection} 
                openEditModal={(id) => {
                    setEditingVisit(visits.find(v => v.id === id));
                    setModalOpen(true);
                }}
            />
            <Footer 
                hasPendingSelected={visits.some(v => v.isSelected && v.isPending)} 
                concludeSelected={concludeSelected} 
            />
            {isModalOpen && (
                <CreateModal 
                    isOpen={isModalOpen} 
                    onClose={() => setModalOpen(false)} 
                    onSave={addOrEditVisit} 
                    initialData={editingVisit} 
                />
            )}
        </div>
    );
};

export default App;
