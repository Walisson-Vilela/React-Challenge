import React from 'react';
import styles from './footer.module.css';

interface FooterProps {
  hasPendingSelected: boolean;
  concludeSelected: () => void;
}

const Footer: React.FC<FooterProps> = ({ hasPendingSelected, concludeSelected }) => {
  return (
    <footer className={styles.container}>
      <button
        onClick={concludeSelected}
        disabled={!hasPendingSelected}
        className={styles.button}
      >
        Conclude Selected Visits
      </button>
    </footer>
  );
};

export default Footer;
