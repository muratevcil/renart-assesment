import React from 'react';
import ProductCard from '../molecules/ProductCard';
import Button from '../atoms/Button';
import styles from './ProductCarousel.module.css';

interface ProductCarouselProps {
  products: any[];
  selectedColors: { [id: number]: number };
  onColorSelect: (productId: number, colorIdx: number) => void;
  page: number;
  setPage: (page: number) => void;
  PRODUCTS_PER_PAGE: number;
  colorNames: string[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  selectedColors,
  onColorSelect,
  page,
  setPage,
  PRODUCTS_PER_PAGE,
  colorNames,
}) => {
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIdx = page * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIdx, endIdx);

  const handlePrev = () => setPage(page === 0 ? totalPages - 1 : page - 1);
  const handleNext = () => setPage(page === totalPages - 1 ? 0 : page + 1);

  return (
    <>
      <div className={styles.carouselRow}>
        <Button className={styles.arrowBtn} onClick={handlePrev} aria-label="Previous products">&#60;</Button>
        <div className={styles.productsGrid}>
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedColorIdx={selectedColors[product.id] ?? 0}
              onColorSelect={(idx) => onColorSelect(product.id, idx)}
              colorNames={colorNames}
            />
          ))}
        </div>
        <Button className={styles.arrowBtn} onClick={handleNext} aria-label="Next products">&#62;</Button>
      </div>
      <div className={styles.paginationBar}>
        <div className={styles.paginationTrack}>
          <div
            className={styles.paginationThumb}
            style={{ width: `${100 / totalPages}%`, left: `${(100 / totalPages) * page}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductCarousel; 