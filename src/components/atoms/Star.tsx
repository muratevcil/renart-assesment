import React from 'react';

interface StarProps {
  filled?: boolean;
  className?: string;
}

const Star: React.FC<StarProps> = ({ filled = true, className = '' }) => (
  <span className={className} aria-hidden>
    {filled ? '★' : '☆'}
  </span>
);

export default Star; 