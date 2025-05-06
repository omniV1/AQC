import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'sage' | 'olive';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default' 
}) => {
  const baseStyles = 'rounded-lg p-6 shadow-soft';
  const variantStyles = {
    default: 'bg-cream',
    sage: 'bg-sage',
    olive: 'bg-olive'
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}; 