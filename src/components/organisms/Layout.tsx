import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ 
      margin: 0, 
      padding: 0, 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <main style={{ 
        margin: 0, 
        padding: 0, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </main>
    </div>
  );
};

export default Layout; 