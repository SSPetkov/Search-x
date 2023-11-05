import React from 'react';
import './Button.scss';
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type }) => {
  const buttonClasses = `custom-button ${
    type === 'danger' ? 'danger-button' : ''
  }`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
