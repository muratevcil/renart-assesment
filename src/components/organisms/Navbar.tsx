'use client';

import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <span className={styles.logoText}>Jewelry Store</span>
        </div>
        
        <div className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
          <a href="/" className={styles.navLink} onClick={closeMenu}>
            Home
          </a>
          <a href="/about" className={styles.navLink} onClick={closeMenu}>
            About Us
          </a>
          <a href="/products" className={styles.navLink} onClick={closeMenu}>
            Products
          </a>
          <a href="/contact" className={styles.navLink} onClick={closeMenu}>
            Contact
          </a>
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          <span className={`${styles.bar} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.active : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.active : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 