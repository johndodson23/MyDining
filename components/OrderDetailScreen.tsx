
import React from 'react';
import { Order, MealTime, OrderItem } from '../types';
import { OrderTracker } from './OrderTracker';

interface OrderDetailScreenProps {
  order: Order;
  onBack: () => void;
}

const groupItemsByCategory = (items: OrderItem[]): { [category: string]: OrderItem[] } => {
    return items.reduce((acc, orderItem) => {
        const category = orderItem.item.category;
        (acc[category] = acc[category] || []).push(orderItem);
        return acc;
    }, {} as { [category: string]: OrderItem[] });
};

export const OrderDetailScreen: React.FC<OrderDetailScreenProps> = ({ order, onBack }) => {
  
  const orderedMeals = (Object.keys(order.meals) as MealTime[]).filter(mt => order.meals[mt] && order.meals[mt]!.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-rush-green-dark">Order Details</h1>
            <p className="text-rush-gray-dark mt-1">Order #{order.id.slice(-6)}</p>
            {order.submittedAt && <p className="text-sm text-gray-500">Placed on: {order.submittedAt.toLocaleString()}</p>}
        </div>

        <OrderTracker status={order.status} />

        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">Your Selections</h2>
            {orderedMeals.map(mealTime => {
                const mealOrder = order.meals[mealTime]!;
                const groupedItems = groupItemsByCategory(mealOrder.items);
                const categories = Object.keys(groupedItems);

                return (
                    <div key={mealTime} className="border border-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-rush-green">{mealTime}</h3>
                        <div className="mt-4 space-y-3">
                            {categories.map(category => (
                                <div key={category}>
                                    <h4 className="text-md font-semibold text-gray-700">{category}</h4>
                                    <ul className="mt-1 list-disc list-inside text-gray-600 pl-2">
                                        {groupedItems[category].map(({ item }) => (
                                            <li key={`${mealTime}-${item.id}`}>
                                                {item.name}
                                                {item.subCategory && <span className="text-gray-500 italic ml-2">({item.subCategory})</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        {mealOrder.specialNotes && (
                            <div className="mt-4 bg-yellow-50 border-l-4 border-rush-yellow p-3">
                                <p className="text-sm font-semibold text-yellow-800">Special Notes:</p>
                                <p className="text-sm text-yellow-700 italic">"{mealOrder.specialNotes}"</p>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
        <div className="mt-10 text-center">
            <button
            onClick={onBack}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
            >
            Back to All Orders
            </button>
        </div>
      </div>
    </div>
  );
};