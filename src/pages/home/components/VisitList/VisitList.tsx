import React from "react";
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
                <span className={styles.data}>
                  <p>{visit.address},</p>
                  <p>{visit.number},</p>
                  <p>{visit.neighborhood},</p>
                  <p>{visit.city},</p>
                  <p>{visit.uf}</p>
                  <p>{visit.cep}</p>
                </span>
                <div style={{display: 'flex', width: '100%' }}>
                  {visit.conclusionDate ? (
                    <p>
                      Concluida: {visit.conclusionDate}
                    </p>
                  ) : (
                    <p >
                      Última modificação:{visit.lastModified}
                    </p>
                  )}
                </div>
              </div>
            <button
              onClick={() => openEditModal(visit.id)}
              disabled={!visit.isPending}
            >
              Editar
            </button>
          </div>
            </div>
        </div>
      ))}
    </section>
  );
};

export default VisitList;
