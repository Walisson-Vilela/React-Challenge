import React, { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Checkbox } from "@mui/material";
import EditIcon from "../../../../images/edit.svg";
import EditIconDisabled from "../../../../images/editDisabled.svg";
import styles from "./visitList.module.css";

interface Visit {
  id: number;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  uf: string;
  cep: string;
  lastModified: string;
  conclusionDate?: string;
  isPending: boolean;
  isSelected: boolean;
}

interface VisitListProps {
  visits: Visit[];
  toggleSelection: (id: number) => void;
  openEditModal: (id: number) => void;
  visitsPerPage: number; // Quantidade de visitas por página
  sortOrder: "asc" | "desc"; // A ordem de classificação
}

const formatDate = (dateString: string | undefined) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "EEE dd/MM/yyyy - HH:mm", { locale: ptBR });
};

const VisitList: React.FC<VisitListProps> = ({
  visits,
  toggleSelection,
  openEditModal,
  visitsPerPage,
  sortOrder,
}) => {
  // Ordenar todas as visitas antes de aplicar a paginação
  const sortedVisits = [...visits].sort((a, b) => {
    const dateA = new Date(a.lastModified).getTime();
    const dateB = new Date(b.lastModified).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Visitas a serem exibidas na página atual
  const startIndex = (currentPage - 1) * visitsPerPage;
  const endIndex = startIndex + visitsPerPage;
  const visitsToDisplay = sortedVisits.slice(startIndex, endIndex);

  return (
    <section className={styles.container}>
      {visitsToDisplay.map((visit) => (
        <div key={visit.id} className={styles.cardDisplay}>
          <div
            className={styles.statusBar}
            style={{
              backgroundColor: visit.conclusionDate
                ? "green"
                : "var(--secondaryColor)",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className={styles.innerContainer}>
              <Checkbox
                checked={visit.isSelected}
                onChange={() => toggleSelection(visit.id)}
                style={{ marginRight: "1rem" }}
                color="primary"
                disabled={!!visit.conclusionDate} // Desabilita se houver uma data de conclusão
              />
              <div className={styles.dataArea}>
                <div className={styles.data}>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      gap: "0.5rem",
                    }}
                  >
                    <p>
                      <strong>Logradouro:</strong> {visit.address},
                    </p>
                    <p>
                      <strong>Número:</strong> {visit.number} -
                    </p>
                    <p>
                      <strong>CEP:</strong> {visit.cep}
                    </p>
                  </span>
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      gap: "0.5rem",
                    }}
                  >
                    <p>
                      <strong>Bairro:</strong> {visit.neighborhood},
                    </p>
                    <p>
                      <strong>Cidade:</strong> {visit.city},
                    </p>
                    <p>
                      <strong>UF:</strong> {visit.uf}.
                    </p>
                  </span>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  {visit.conclusionDate ? (
                    <p style={{ fontSize: "0.8rem" }}>
                      Concluída: {formatDate(visit.conclusionDate)}
                    </p>
                  ) : (
                    <p style={{ fontSize: "0.8rem" }}>
                      Última modificação: {formatDate(visit.lastModified)}
                    </p>
                  )}
                </div>
              </div>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: visit.isPending ? "pointer" : "default",
                  paddingRight: "1rem",
                }}
                onClick={() => openEditModal(visit.id)}
                disabled={!visit.isPending}
              >
                <img
                  src={!visit.isPending ? EditIconDisabled : EditIcon}
                  alt="Editar"
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default VisitList;
