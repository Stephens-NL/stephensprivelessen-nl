import React from 'react';
import { ButtonProps } from '../data';



const Button= ({ onClick, children, className = '', type = 'button', disabled = false }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition duration-300 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
    >
      {children}
    </button>
  );
};

export default Button;
