import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '' }) => {
  const baseStyle = "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/10 active:scale-[0.98]",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 active:scale-[0.98]",
    success: "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-600/10 active:scale-[0.98]",
    danger: "bg-rose-600/10 hover:bg-rose-600 border border-rose-500/20 text-rose-400 hover:text-white active:scale-[0.98]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${disabled ? 'opacity-40 cursor-not-allowed transform-none pointer-events-none' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
