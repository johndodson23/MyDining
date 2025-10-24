
import React from 'react';
import { useStaff } from '../StaffContext';
import { StaffRole } from '../../types';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useStaff();

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as StaffRole);
  };

  return (
    <div className="p-2 bg-rush-yellow text-yellow-900 rounded-md">
      <label htmlFor="role-switcher" className="block text-xs font-bold mb-1 uppercase tracking-wider">Demo Role</label>
      <select
        id="role-switcher"
        value={role}
        onChange={handleRoleChange}
        className="w-full p-1 border border-yellow-400 rounded-md bg-white text-sm focus:ring-1 focus:ring-yellow-500 focus:outline-none"
      >
        <option value={StaffRole.Staff}>Staff</option>
        <option value={StaffRole.Manager}>Manager</option>
        <option value={StaffRole.Dietitian}>Dietitian</option>
      </select>
    </div>
  );
};
