import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import VisitList from "./components/VisitList/VisitList";
import AddModal from "./components/AddModal/AddModal";
import styles from "./home.module.css";

const Home: React.FC = () => {
  const [visits, setVisits] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 10; // Máximo de itens por página

  // Carregar as visitas do localStorage ao montar o componente
  useEffect(() => {
    const savedVisits = localStorage.getItem("visits");
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);

  // Salvar visitas no localStorage sempre que a lista for alterada
  useEffect(() => {
    if (visits.length > 0) {
      localStorage.setItem("visits", JSON.stringify(visits));
    }
  }, [visits]);

  // Calcular os índices de início e fim para paginação
  const indexOfLastVisit = currentPage * itemsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - itemsPerPage;
  const currentVisits = visits.slice(indexOfFirstVisit, indexOfLastVisit);

  // Mudar a página
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleOpenAddModal = () => {
    setEditingVisit(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (id: number) => {
    const visitToEdit = visits.find((v) => v.id === id);
    setEditingVisit(visitToEdit);
    setModalOpen(true);
  };

  const addOrEditVisit = (data: any) => {
    if (editingVisit) {
      setVisits((prev) =>
        prev.map((v) =>
          v.id === editingVisit.id
            ? { ...v, ...data, lastModified: new Date().toISOString() }
            : v
        )
      );
    } else {
      setVisits((prev) => [
        ...prev,
        {
          ...data,
          id: Date.now(),
          isPending: true,
          isSelected: false,
          lastModified: new Date().toISOString(),
        },
      ]);
    }
    setEditingVisit(null);
    setModalOpen(false);
  };

  const toggleSelection = (id: number) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isSelected: !v.isSelected } : v))
    );
  };

  const concludeSelected = () => {
    setVisits((prev) =>
      prev.map((v) =>
        v.isSelected && v.isPending
          ? { ...v, isPending: false, conclusionDate: new Date().toISOString() }
          : v
      )
    );
  };

  return (
    <div className={styles.container}>
<Header
  pendingCount={visits.filter((v) => v.isPending).length}
  openModal={handleOpenAddModal}
  visits={currentVisits} // Passando as visitas da página atual
  toggleSelection={toggleSelection}  // Passando a função com o tipo correto
  openEditModal={handleOpenEditModal} // Passando a função com o tipo correto
/>
      <Footer
        hasPendingSelected={visits.some((v) => v.isSelected && v.isPending)}
        concludeSelected={concludeSelected}
        currentPage={currentPage} // Página atual
        totalPages={Math.ceil(visits.length / itemsPerPage)} // Número total de páginas
        onPageChange={handleChangePage} // Função para mudar a página
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
