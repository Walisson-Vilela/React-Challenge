import React, { useState } from "react";
import styles from './primaryButton.module.css';

interface PrimaryButtonProps {
  onClick: () => void; // Define o tipo da função que será passada
  disabled: boolean;
  text: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, text, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button 
    className={`${styles.button} ${disabled ? styles.disabled : isHovered ? styles.hovered : styles.default}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={text}
      title={text}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
