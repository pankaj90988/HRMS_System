import React from 'react';

const Table = ({ headers, children, className = '' }) => {
  return (
    <div className={`overflow-x-auto w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-xl ${className}`}>
      <table className="w-full text-left text-xs sm:text-sm">
        <thead className="bg-slate-950/60 text-slate-500 font-mono text-[11px] uppercase border-b border-slate-800/80">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="p-4 font-semibold tracking-wider">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40 text-slate-300">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
