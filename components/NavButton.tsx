import React from 'react';
import Link from 'next/link';

interface NavButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  isExternal?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  href,
  children,
  className = '',
  isActive = false,
  isExternal = false,
}) => {
  // Determine the active and hover styles
  const activeClass = isActive ? 'bg-green-500 text-white' : 'text-gray-700 hover:bg-green-100';
  // Combine base styles with active state styles and any additional classes passed via props
  const combinedClassName = `px-2 py-2 lg:px-3 rounded-md text-sm font-medium transition ${activeClass} ${className}`;

  // If href is provided, render as a link
  if (href) {
    // Check if the link is external
    if (isExternal) {
      return (
        <a href={href} className={combinedClassName} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    // Render as a Next.js Link for internal navigation
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Otherwise, render as a button element
  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default NavButton;
