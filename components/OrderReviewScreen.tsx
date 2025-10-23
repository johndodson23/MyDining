
import React from 'react';
import { Patient, Order, MealTime, OrderItem } from '../types';
import { isOrderingAvailable } from '../utils/time';

interface OrderReviewScreenProps {
  patient: Patient;
  order: Order;
  onBack: () => void;
  onSubmit: () => void;
  onTimeViolation: (meal: MealTime) => void;
  isSubmitting: boolean;
  isTimeLogicDisabled: boolean;
}

const groupItemsByCategory = (items: OrderItem[]): { [category: string]: OrderItem[] } => {
    return items.reduce((acc, orderItem) => {
        const category = orderItem.item.category;
        (acc[category] = acc[category] || []).push(orderItem);
        return acc;
    }, {} as { [category: string]: OrderItem[] });
};


export const OrderReviewScreen: React.FC<OrderReviewScreenProps> = ({ patient, order, onBack, onSubmit, onTimeViolation, isSubmitting, isTimeLogicDisabled }) => {

  const handleSubmit = () => {
    for (const meal of Object.keys(order.meals) as MealTime[]) {
        if ((order.meals[meal]?.items.length || 0) > 0 && !isOrderingAvailable(meal, isTimeLogicDisabled)) {
            onTimeViolation(meal);
            return;
        }
    }
    onSubmit();
  };
  
  const orderedMeals = (Object.keys(order.meals) as MealTime[]).filter(mt => order.meals[mt] && order.meals[mt]!.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-rush-green-dark text-center">Confirm Your Order</h1>
      
      <div className="text-center mt-4 p-4 bg-rush-gray-light rounded-lg border">
        <p className="text-base text-gray-600">Ordering for: <strong>{patient.name}</strong> (Room {patient.roomNumber})</p>
        <p className="text-base text-gray-600">Diet: <strong>{patient.diet.join(', ')}</strong></p>
      </div>


      <div className="mt-8 space-y-6">
        {orderedMeals.map(mealTime => {
            const mealOrder = order.meals[mealTime]!;
            const groupedItems = groupItemsByCategory(mealOrder.items);
            const categories = Object.keys(groupedItems);

            return (
                 <div key={mealTime} className="border border-gray-200 p-4 rounded-lg">
                    <h2 className="text-2xl font-semibold text-rush-green flex justify-between items-center">
                        {mealTime}
                        {!isOrderingAvailable(mealTime, isTimeLogicDisabled) && <span className="text-sm font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">Past Cutoff Time</span>}
                    </h2>
                    
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

      <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={onBack}
          className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Make Changes
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-rush-green text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-wait"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </div>
    </div>
  );
};