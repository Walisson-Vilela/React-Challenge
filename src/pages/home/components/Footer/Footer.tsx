import React from "react";
import styles from "./footer.module.css";
import PrimaryButton from "../../../../components/PrimaryButton/PrimaryButton";
import PaginationRounded from "../../../../components/Pagination/Pagination";

interface FooterProps {
  hasPendingSelected: boolean;
  concludeSelected: () => void;
}

const Footer: React.FC<FooterProps> = ({
  hasPendingSelected,
  concludeSelected,
}) => {
  return (
    <footer className={styles.container}>
      <PrimaryButton
        text=" Concluir todas as visitas selecionadas"
        onClick={concludeSelected}
        disabled={!hasPendingSelected}
      />
      <PaginationRounded />
    </footer>
  );
};

export default Footer;
