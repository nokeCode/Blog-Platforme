export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30',
    secondary: 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 shadow-sm',
    ghost: 'bg-transparent text-gray-600 hover:text-primary-600 hover:bg-primary-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-500/30',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-semibold',
  };


  return (
    <button
      className={`rounded-xl transition-all duration-300 active:scale-95 font-medium ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
    
  );
};