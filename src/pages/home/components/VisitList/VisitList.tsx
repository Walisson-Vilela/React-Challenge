import React from "react";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
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
}

const VisitList: React.FC<VisitListProps> = ({
  visits,
  toggleSelection,
  openEditModal,
}) => {
  return (
    <section className={styles.container}>
      {visits.map((visit) => (
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
              <input
                style={{ marginRight: "1rem" }}
                type="checkbox"
                checked={visit.isSelected}
                onChange={() => toggleSelection(visit.id)}
              />
              <div className={styles.dataArea}>
                <div className={styles.data}>
                  <span style={{display: 'flex', flexDirection: 'row', width: '100%', gap: '0.5rem'}}>
                    <p><strong>Logradouro:</strong> {visit.address},</p>
                    <p><strong>Número:</strong> {visit.number} -</p>
                    <p><strong>CEP:</strong> {visit.cep}</p>
                  </span>
                  <span style={{display: 'flex', flexDirection: 'row', width: '100%', gap:'0.5rem'}}>
                    <p><strong>Bairro:</strong> {visit.neighborhood},</p>
                    <p><strong>Cidade:</strong> {visit.city},</p>
                    <p><strong>UF:</strong> {visit.uf}.</p>
                  </span>
                </div>
                <div style={{ display: "flex", width: "100%" }}>
                  {visit.conclusionDate ? (
                    <p style={{fontSize: '0.8rem'}}>Concluída: {visit.conclusionDate}</p>
                  ) : (
                    <p style={{fontSize: '0.8rem'}}>Última modificação:{visit.lastModified}</p>
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
