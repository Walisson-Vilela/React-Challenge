import React from 'react';
import styles from './primaryButton.module.css';

interface PrimaryButtonProps {
  onClick: () => void; // Define o tipo da função que será passada
  textLabel: string;
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, text, textLabel }) => {
  return (
    <button 
      className={styles.display} 
      onClick={onClick}
      aria-label={text}
      title={text}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
