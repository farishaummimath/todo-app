import React from 'react';
import './style.css'; 

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false, onBack }) => {
  return (
    <div className="app-header">
      {showBackButton && onBack && (
        <button onClick={onBack} className="back-button" title="Back">←</button>
      )}
      <h1>{title}</h1>
      {showBackButton && <div className="header-spacer"></div>}
    </div>
  );
};

export default Header; 