import React, { useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import VisitList from './components/VisitList/VisitList';
import AddModal from './components/AddModal/AddModal';
import styles from './home.module.css';

const Home: React.FC = () => {
    const [visits, setVisits] = useState<any[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingVisit, setEditingVisit] = useState<any>(null);

    const handleOpenAddModal = () => {
        setEditingVisit(null); 
        setModalOpen(true); 
    };

    const handleOpenEditModal = (id: number) => {
        const visitToEdit = visits.find(v => v.id === id);
        setEditingVisit(visitToEdit); 
        setModalOpen(true);
    };

    const addOrEditVisit = (data: any) => {
        if (editingVisit) {
            // Editando uma visita existente
            setVisits(prev =>
                prev.map(v =>
                    v.id === editingVisit.id
                        ? { ...v, ...data, lastModified: new Date().toISOString() }
                        : v
                )
            );
        } else {
            // Adicionando uma nova visita
            setVisits(prev => [
                ...prev,
                {
                    ...data,
                    id: Date.now(),
                    isPending: true,
                    isSelected: false,
                    lastModified: new Date().toISOString(), // Define a data de criação como última modificação inicial
                },
            ]);
        }
        setEditingVisit(null);
        setModalOpen(false);
    };
    

    const toggleSelection = (id: number) => {
        setVisits(prev => prev.map(v => v.id === id ? { ...v, isSelected: !v.isSelected } : v));
    };

    const concludeSelected = () => {
        setVisits(prev => prev.map(v => v.isSelected && v.isPending ? { ...v, isPending: false, conclusionDate: new Date().toISOString() } : v));
    };

    return (
        <div className={styles.container}>
            <Header
                pendingCount={visits.filter(v => v.isPending).length}
                openModal={handleOpenAddModal}
            />
           
            <VisitList 
                visits={visits} 
                toggleSelection={toggleSelection} 
                openEditModal={handleOpenEditModal}
            />
   
            <Footer 
                hasPendingSelected={visits.some(v => v.isSelected && v.isPending)} 
                concludeSelected={concludeSelected} 
            />
            
            {isModalOpen && (
                <AddModal 
                    isOpen={isModalOpen} 
                    onClose={() => setModalOpen(false)} 
                    onSave={addOrEditVisit} 
                    initialData={editingVisit} 
                />
            )}
        </div>
    );
};

export default Home;
