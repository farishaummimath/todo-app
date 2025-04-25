import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
  showBackButton?: boolean; // Optional prop to control back button visibility
  onBack?: () => void;     // Optional callback for the back button
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBack }) => {
  return (
    <div className="app-header">
      {showBackButton && onBack && (
        <button onClick={onBack} className="back-button" title="Back">←</button>
      )}
      <h1>{title}</h1>
      {/* Placeholder for potential right-side actions if needed later */}
      {showBackButton && <div className="header-spacer"></div>}
    </div>
  );
};

export default Header; 