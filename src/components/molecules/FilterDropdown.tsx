import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface FilterDropdownProps {
  className?: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ className = '' }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPriceRange = searchParams.get('price') || '';
  const initialPopularityRange = searchParams.get('popularity') || '';
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [popularityRange, setPopularityRange] = useState(initialPopularityRange);

  const handleFilter = () => {
    const params = new URLSearchParams();
    
    if (priceRange) {
      params.append('price', priceRange);
    }
    
    if (popularityRange) {
      params.append('popularity', popularityRange);
    }

    const queryString = params.toString();
    const url = queryString ? `/?${queryString}` : '/';
    router.push(url);
  };

  const clearFilters = () => {
    setPriceRange('');
    setPopularityRange('');
    router.push('/');
  };

  return (
    <div className={`filter-container ${className}`} style={{
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      borderRadius: '12px',
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#333'
        }}>
          Price Range
        </label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '14px',
            fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            minWidth: '150px'
          }}
        >
          <option value="">All Prices</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000+">$1000+</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#333'
        }}>
          Popularity Score
        </label>
        <select
          value={popularityRange}
          onChange={(e) => setPopularityRange(e.target.value)}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ddd',
            fontSize: '14px',
            fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            minWidth: '150px'
          }}
        >
          <option value="">All Scores</option>
          <option value="0-0.3">0.0 - 0.3</option>
          <option value="0.3-0.6">0.3 - 0.6</option>
          <option value="0.6-0.8">0.6 - 0.8</option>
          <option value="0.8-1.0">0.8 - 1.0</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <button
          onClick={handleFilter}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e6c200',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d4b000'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e6c200'}
        >
          Apply Filters
        </button>
        
        <button
          onClick={clearFilters}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            color: '#666',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterDropdown; 