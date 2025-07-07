import React from 'react';
import styles from './Swatch.module.css';

interface SwatchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const Swatch: React.FC<SwatchProps> = ({ color, selected, onClick, className = '' }) => (
  <button
    type="button"
    className={`${styles.swatch} ${selected ? styles.selected : ''} ${className}`}
    onClick={onClick}
    aria-pressed={selected}
  >
    <span 
      className={styles.swatchCircle}
      style={{ background: color }}
    />
  </button>
);

export default Swatch; 