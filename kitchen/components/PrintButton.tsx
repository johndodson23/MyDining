
import React from 'react';
import { useStaff } from '../StaffContext';

export const PrintButton: React.FC = () => {
  const { role } = useStaff();

  if (role !== 'manager') {
    return null;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Print
    </button>
  );
};
