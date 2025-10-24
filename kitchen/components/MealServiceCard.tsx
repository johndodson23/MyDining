
import React from 'react';
import { Link } from 'react-router-dom';
import { MealTime } from '../../types';

interface MealServiceCardProps {
  mealName: MealTime;
  totalOrders: number;
  newOrders: number;
  inKitchenOrders: number;
  onTheWayOrders: number;
}

export const MealServiceCard: React.FC<MealServiceCardProps> = ({
  mealName,
  totalOrders,
  newOrders,
  inKitchenOrders,
  onTheWayOrders
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h3 className="text-2xl font-bold text-rush-green-dark">{mealName} Service</h3>
      <p className="text-gray-600 mt-2">Total Orders: <span className="font-semibold text-lg">{totalOrders}</span></p>
      <div className="mt-4 space-y-2 text-sm flex-grow">
        <p>New / Confirmed: <span className="font-semibold text-blue-600">{newOrders}</span></p>
        <p>In the Kitchen: <span className="font-semibold text-yellow-600">{inKitchenOrders}</span></p>
        <p>Out for Delivery: <span className="font-semibold text-purple-600">{onTheWayOrders}</span></p>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <Link to={`/kitchen/queue/${mealName.toLowerCase()}`} className="flex-1 text-center bg-rush-green text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
          View Queue
        </Link>
        <Link to={`/kitchen/summary/${mealName.toLowerCase()}`} className="flex-1 text-center bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
          Production Summary
        </Link>
      </div>
    </div>
  );
};
