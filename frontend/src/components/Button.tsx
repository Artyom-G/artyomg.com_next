import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = `
    relative
    inline-block
    overflow-hidden
    text-center
    cursor-pointer
    outline-none
    border-none
    rounded-full
    bg-transparent
    text-white
    opacity-60
    transition-all
    duration-500
    ease-linear
    uppercase
    font-black
    font-sans
    hover:opacity-100
    hover:shadow-[12px_7px_15px_0px_rgba(12,56,52,0.56)]
    before:absolute
    before:content-['']
    before:left-0
    before:bottom-0
    before:h-1
    before:w-full
    before:border-b-4
    before:border-l-4
    before:border-transparent
    before:box-border
    before:translate-x-full
    before:transition-all
    before:duration-300
    before:ease-linear
    after:absolute
    after:content-['']
    after:top-0
    after:left-0
    after:w-full
    after:h-1
    after:border-t-4
    after:border-r-4
    after:border-transparent
    after:rounded-full
    after:box-border
    after:-translate-x-full
    after:transition-all
    after:duration-300
    after:ease-linear
    hover:before:border-white
    hover:before:h-full
    hover:before:translate-x-0
    hover:before:transition-[transform_0.3s_linear,height_0.3s_linear_0.3s]
    hover:before:rounded-full
    hover:after:border-white
    hover:after:h-full
    hover:after:translate-x-0
    hover:after:transition-[transform_0.3s_linear,height_0.3s_linear_0.3s]
  `;

  const sizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const variantClasses = {
    primary: '',
    secondary: 'text-[#a6c267] hover:text-white'
  };

  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  return (
    <button className={combinedClasses} {...props}>
      <span className="px-[15px]">
        {children}
      </span>
    </button>
  );
};

export default Button;
