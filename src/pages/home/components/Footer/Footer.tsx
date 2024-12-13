import React from "react";
import styles from "./footer.module.css";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import PaginationRounded from "../../../../components/Pagination/Pagination";

interface FooterProps {
  hasPendingSelected: boolean;
  concludeSelected: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const Footer: React.FC<FooterProps> = ({
  hasPendingSelected,
  concludeSelected,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <footer className={styles.container}>
      <PrimaryButton
        text=" Concluir todas as visitas selecionadas"
        onClick={concludeSelected}
        disabled={!hasPendingSelected}
      />
      {/* A paginação foi movida para o Footer */}
      <PaginationRounded
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </footer>
  );
};

export default Footer;
