import React from 'react';
import Star from '../atoms/Star';
import styles from './StarRating.module.css';

interface StarRatingProps {
  score: number;
  max?: number;
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ score, max = 5, className = '' }) => {
  const fullStars = Math.floor(score);
  const hasHalfStar = score % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className={styles.stars + ' ' + className}>
      {[...Array(fullStars)].map((_, i) => <Star key={'full-' + i} filled className={styles.star} />)}
      {hasHalfStar && <Star filled={false} className={styles.star} />}
      {[...Array(emptyStars)].map((_, i) => <Star key={'empty-' + i} filled={false} className={styles.emptyStar} />)}
      <span className={styles.scoreText}>{score.toFixed(1)}/{max}</span>
    </div>
  );
};

export default StarRating; 