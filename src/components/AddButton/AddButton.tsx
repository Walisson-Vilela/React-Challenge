import React from 'react';
import styles from './addButton.module.css';

interface AddButtonProps {
  onClick: () => void; // Define o tipo da função que será passada
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button 
      className={styles.display} 
      onClick={onClick}
      aria-label="Adicionar item"
      title="Adicionar item"
    >
      +
    </button>
  );
};

export default AddButton;
