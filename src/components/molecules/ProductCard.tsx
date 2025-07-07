import React from 'react';
import Image from 'next/image';
import ColorSwatchGroup from './ColorSwatchGroup';
import StarRating from './StarRating';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    weight: number;
    imageUrls: string[];
    popularityScore: number;
    price:number;
  };
  selectedColorIdx: number;
  onColorSelect: (idx: number) => void;
  colorNames?: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, selectedColorIdx, onColorSelect, colorNames }) => (
  <div className={styles.productCard}>
    <div className={styles.productImageWrap}>
      <Image
        src={product.imageUrls[selectedColorIdx] || product.imageUrls[0]}
        alt={product.name}
        width={220}
        height={220}
        className={styles.productImage}
      />
    </div>
    <div className={styles.productInfo}>
      <div className={styles.productTitle}>{product.name}</div>
      <div className={styles.productPrice}>${product.price.toFixed(2)}</div>
      <ColorSwatchGroup
        colors={["#e6c200", "#e6b3b3", "#e6e6e6"]} // we can make this dynamic from the product data
        selectedIdx={selectedColorIdx}
        onSelect={onColorSelect}
        colorNames={colorNames}
      />
      <StarRating score={Math.min(5, Math.max(1, (product.popularityScore) * 5))} />
    </div>
  </div>
);

export default ProductCard; 