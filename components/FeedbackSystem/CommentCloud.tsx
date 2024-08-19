import React from 'react';

interface CommentCloudProps {
  children: React.ReactNode;
  className?: string;
}

const CommentCloud: React.FC<CommentCloudProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      relative 
      bg-white bg-opacity-20 
      backdrop-blur-sm 
      text-white
      p-3 
      rounded-lg 
      shadow-lg
      overflow-hidden
      transition-all
      duration-300
      hover:bg-opacity-30
      sm:p-4 
      md:p-5 
      lg:p-6
      ${className}
    `}>
      <div className="
        absolute 
        -top-10 
        -right-10 
        w-20 
        h-20 
        bg-gradient-to-br 
        from-purple-500 
        to-pink-500 
        rounded-full 
        opacity-50
        blur-xl
      "/>
      <div className="relative z-10">
        {children}
      </div>
      <div className="
        absolute 
        -bottom-2 
        left-1/2 
        transform 
        -translate-x-1/2 
        w-4 
        h-4 
        bg-white 
        bg-opacity-20 
        rotate-45
      " />
    </div>
  );
};

export default CommentCloud;