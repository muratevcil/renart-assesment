'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCarousel from '../components/organisms/ProductCarousel';
import FilterDropdown from '../components/molecules/FilterDropdown';
import Layout from '../components/organisms/Layout';
import styles from './page.module.css';

interface Jewelry {
  id: number;
  name: string;
  weight: number;
  imageUrls: string[];
  popularityScore: number;
  price: number;
}

const PRODUCTS_PER_PAGE = 5;
const COLOR_NAMES = ["Yellow Gold", "Rose Gold", "While Gold"];

export default function Home() {
  const searchParams = useSearchParams();
  const [jewelries, setJewelries] = useState<Jewelry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    fetchJewelries();
  }, [searchParams]);

  const fetchJewelries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      const priceFilter = searchParams.get('price');
      const popularityFilter = searchParams.get('popularity');
      
      if (priceFilter) {
        params.append('price', priceFilter);
      }
      
      if (popularityFilter) {
        params.append('popularity', popularityFilter);
      }

      const queryString = params.toString();
      const url = queryString ? `/api/jewelry?${queryString}` : '/api/jewelry';
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch jewelry data');
      }
      const data = await response.json();
      setJewelries(data);
      setPage(0); // Reset to first page when filters change
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleColorSelect = (productId: number, colorIdx: number) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIdx }));
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.loading}>Loading products...</div>
        </div>
      </Layout>
    );
  }
  if (error) {
    return (
      <Layout>
        <div className={styles.page}>
          <div className={styles.error}>Error: {error}</div>
        </div>
      </Layout>
    );
  }
  if (jewelries.length === 0) {
    return (
      <Layout>
        <div className={styles.page}>
          <h1 className={styles.productListTitle}>Product List</h1>
          <FilterDropdown />
          <div className={styles.empty}>No products match your filters</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.page}>
        <h1 className={styles.productListTitle}>Product List</h1>
        <FilterDropdown />
        <ProductCarousel
          products={jewelries}
          selectedColors={selectedColors}
          onColorSelect={handleColorSelect}
          page={page}
          setPage={setPage}
          PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}
          colorNames={COLOR_NAMES}
        />
      </div>
    </Layout>
  );
}
