import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddModal from "./components/AddModal/AddModal";
import styles from "./home.module.css";

// Definição do componente principal Home
const Home: React.FC = () => {
  const [visits, setVisits] = useState<any[]>([]);  // Estado para armazenar a lista de visitas
  const [isModalOpen, setModalOpen] = useState(false);  // Estado para controlar a visibilidade do modal
  const [editingVisit, setEditingVisit] = useState<any>(null);  // Estado para armazenar a visita que está sendo editada
  const [currentPage, setCurrentPage] = useState(1);  // Estado para controlar a página atual da paginação
  const itemsPerPage = 10;  // Define o número de itens exibidos por página
  const [filter, setFilter] = useState<string>("all");  // Estado para armazenar o filtro atual (ex: "all", "pending", "completed")

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");// Estado para armazenar a ordem de ordenação (ascendente ou descendente)

  // Efeito para carregar visitas do localStorage ao montar o componente
  useEffect(() => {
    const savedVisits = localStorage.getItem("visits");
    if (savedVisits) {
      setVisits(JSON.parse(savedVisits));
    }
  }, []);

  // Efeito para salvar as visitas no localStorage sempre que elas forem atualizadas
  useEffect(() => {
    if (visits.length > 0) {
      localStorage.setItem("visits", JSON.stringify(visits));
    }
  }, [visits]);

  // Efeito para ordenar visitas automaticamente ao carregar o componente
  useEffect(() => {
    setVisits((prev) => {
      return [...prev].sort((a, b) => {
        const dateA = new Date(a.lastModified).getTime();
        const dateB = new Date(b.lastModified).getTime();
        return dateB - dateA; // Ordenação padrão: do mais recente para o mais antigo
      });
    });
  }, []);

  // Função para alternar entre ordenação ascendente e descendente
  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filtragem das visitas com base no filtro selecionado
  const filteredVisits = visits.filter((visit) => {
    if (filter === "pending") return visit.isPending;
    if (filter === "completed") return !visit.isPending;
    return true; // Retorna todas as visitas quando o filtro é "all"
  });

  // Ordenação das visitas filtradas com base na ordem selecionada
  const sortedVisits = filteredVisits.sort((a, b) => {
    const dateA = new Date(a.lastModified).getTime();
    const dateB = new Date(b.lastModified).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Paginação: seleção das visitas para a página atual
  const currentVisits = sortedVisits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Atualiza a página atual ao mudar de página
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Abre o modal de adição e limpa os dados de edição
  const handleOpenAddModal = () => {
    setEditingVisit(null);
    setModalOpen(true);
  };

  // Abre o modal de edição e carrega os dados da visita a ser editada
  const handleOpenEditModal = (id: number) => {
    const visitToEdit = visits.find((v) => v.id === id);
    setEditingVisit(visitToEdit);
    setModalOpen(true);
  };

  // Adiciona ou edita uma visita na lista
  const addOrEditVisit = (data: any) => {
    if (editingVisit) {
      // Edita uma visita existente
      setVisits((prev) =>
        prev.map((v) =>
          v.id === editingVisit.id
            ? {
                ...v,
                ...data,
                lastModified: new Date().toISOString(),
                conclusionDate: v.conclusionDate || null,
              }
            : v
        )
      );
    } else {
      // Adiciona uma nova visita
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

  // Alterna a seleção de uma visita
  const toggleSelection = (id: number) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isSelected: !v.isSelected } : v))
    );
  };

  // Marca como concluídas as visitas selecionadas que estão pendentes
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
      {/* Componente de cabeçalho */}
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

      {/* Componente de rodapé */}
      <Footer
        hasPendingSelected={visits.some((v) => v.isSelected && v.isPending)}
        concludeSelected={concludeSelected}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredVisits.length / itemsPerPage)}
        onPageChange={handleChangePage}
      />

      {/* Modal de adição/edição */}
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
