
import React from 'react';
import { Order, Patient, MealOrder } from '../../types';

interface OrderCardProps {
  order: Order;
  patient: Patient;
  onClick: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, patient, onClick }) => {
  const timeSince = (date?: Date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 60;
    if (interval < 60) return Math.floor(interval) + "m ago";
    interval = seconds / 3600;
    return Math.floor(interval) + "h ago";
  };

  const mealNames = Object.keys(order.meals).join(', ');
  const hasAllergy = patient.allergies.length > 0;
  // FIX: Cast 'm' to MealOrder to resolve 'unknown' type from Object.values and access 'specialNotes'
  const hasNotes = Object.values(order.meals).some(m => (m as MealOrder)?.specialNotes);

  return (
    <div onClick={onClick} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer border-l-4 border-rush-green transition-shadow duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-base text-rush-green-dark">{patient.name}</h3>
          <p className="text-sm text-gray-600">Rm {patient.roomNumber}</p>
        </div>
        <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">{timeSince(order.submittedAt)}</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {hasAllergy && <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rush-red text-white">Allergy</span>}
        {hasNotes && <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rush-yellow text-yellow-800">Note</span>}
      </div>
    </div>
  );
};