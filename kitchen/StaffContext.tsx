
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { StaffRole } from '../types';

interface StaffContextType {
  role: StaffRole;
  setRole: (role: StaffRole) => void;
}

const StaffContext = createContext<StaffContextType | undefined>(undefined);

export const StaffProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<StaffRole>(StaffRole.Staff);

  return (
    <StaffContext.Provider value={{ role, setRole }}>
      {children}
    </StaffContext.Provider>
  );
};

export const useStaff = (): StaffContextType => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider');
  }
  return context;
};
