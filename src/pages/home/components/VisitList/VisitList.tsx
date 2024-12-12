import React from "react";
import styles from "./vistList.module.css";

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

const VisitList: React.FC<VisitListProps> = ({
  visits,
  toggleSelection,
  openEditModal,
}) => {
  return (
    <section className={styles.container}>
      {visits.map((visit) => (
        <div
          key={visit.id}
          className={styles.cardDisplay}
        
        >
          <div className={styles.statusBar}   style={{
            backgroundColor: visit.conclusionDate ? "green" : "var(--secondaryColor)",
          }}></div>
          <div className={styles.innerContainer}>
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
        </div>
      ))}
    </section>
  );
};

export default VisitList;
