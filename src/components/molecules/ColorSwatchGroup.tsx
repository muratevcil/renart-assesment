import React from 'react';
import Swatch from '../atoms/Swatch';

interface ColorSwatchGroupProps {
  colors: string[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
  colorNames?: string[];
  className?: string;
}

const ColorSwatchGroup: React.FC<ColorSwatchGroupProps> = ({ colors, selectedIdx, onSelect, colorNames = [], className = '' }) => (
  <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', gap: 10, marginBottom: 4 }}>
      {colors.map((color, idx) => (
        <Swatch
          key={idx}
          color={color}
          selected={selectedIdx === idx}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
    <div style={{ 
      fontSize: '12px', 
      color: '#b1a16b', 
      marginBottom: 8, 
      marginLeft: 2,
      fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: 300
    }}>
      {colorNames[selectedIdx] || 'Color'}
    </div>
  </div>
);

export default ColorSwatchGroup; 