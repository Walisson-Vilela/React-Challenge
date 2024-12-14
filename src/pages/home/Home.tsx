import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddModal from "./components/AddModal/AddModal";
import styles from "./home.module.css";

const Home: React.FC = () => {
  const [visits, setVisits] = useState<any[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filter, setFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Ordenação padrão

  useEffect(() => {
    const savedVisits = localStorage.getItem("visits");
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);

  useEffect(() => {
    if (visits.length > 0) {
      localStorage.setItem("visits", JSON.stringify(visits));
    }
  }, [visits]);

  // Ordenar visitas ao carregar
  useEffect(() => {
    setVisits((prev) => {
      return [...prev].sort((a, b) => {
        const dateA = new Date(a.lastModified).getTime();
        const dateB = new Date(b.lastModified).getTime();
        return dateB - dateA; // Ordenação padrão do mais recente para o mais antigo
      });
    });
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredVisits = visits.filter((visit) => {
    if (filter === "pending") return visit.isPending;
    if (filter === "completed") return !visit.isPending;
    return true;
  });

  const sortedVisits = filteredVisits.sort((a, b) => {
    const dateA = new Date(a.lastModified).getTime();
    const dateB = new Date(b.lastModified).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const currentVisits = sortedVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
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
            ? { ...v, ...data, lastModified: new Date().toISOString(), conclusionDate: v.conclusionDate || null }
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
          conclusionDate: null,
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
        v.isSelected && v.isPending ? { ...v, isPending: false, conclusionDate: new Date().toISOString() } : v
      )
    );
  };

  return (
    <div className={styles.container}>
      <Header
        pendingCount={visits.filter((v) => v.isPending).length}
        openModal={handleOpenAddModal}
        visits={currentVisits}
        toggleSelection={toggleSelection}
        openEditModal={handleOpenEditModal}
        setFilter={setFilter}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
      <Footer
        hasPendingSelected={visits.some((v) => v.isSelected && v.isPending)}
        concludeSelected={concludeSelected}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredVisits.length / itemsPerPage)}
        onPageChange={handleChangePage}
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
