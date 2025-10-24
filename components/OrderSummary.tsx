
import React from 'react';
import { Order, MealTime, OrderItem, Item, MealOrder } from '../types';
import { TrashIcon } from './Icons';

interface OrderSummaryProps {
  order: Order;
  activeMeal: MealTime;
  setOrder: (order: Order) => void;
  onReviewOrder: () => void;
}

const isEntree = (item: Item): boolean => item.category.toLowerCase().includes('entrée');
const NON_SIDE_CATEGORIES = ['Beverages', 'Dessert', 'Fruit', 'Cereal', 'Dairy', 'Proteins', 'Bakery', 'Soup', 'Starters'];
const isSide = (item: Item): boolean => !isEntree(item) && !NON_SIDE_CATEGORIES.includes(item.category);

const groupItemsByCategory = (items: OrderItem[]): { [category: string]: OrderItem[] } => {
    return items.reduce((acc, orderItem) => {
        const category = orderItem.item.category;
        (acc[category] = acc[category] || []).push(orderItem);
        return acc;
    }, {} as { [category: string]: OrderItem[] });
};

const MealOrderSummary: React.FC<{mealOrder: MealOrder, onNotesChange: (notes: string) => void, onRemove: (itemId: number) => void, onDietitianReviewChange: (checked: boolean) => void}> = ({ mealOrder, onNotesChange, onRemove, onDietitianReviewChange }) => {
    const entreeCount = mealOrder.items.filter(({ item }) => isEntree(item)).length;
    const sideCount = mealOrder.items.filter(({ item }) => isSide(item)).length;
    const groupedItems = groupItemsByCategory(mealOrder.items);
    const categories = Object.keys(groupedItems);

    return (
        <div>
            <div className="flex justify-between items-baseline mb-2">
                 <div className="text-xs font-semibold text-gray-500 space-x-3">
                    <span className={`px-2 py-0.5 rounded-full ${entreeCount > 1 ? 'bg-red-100 text-red-700' : 'bg-gray-200'}`}>
                        Entrée: {entreeCount}/1
                    </span>
                     <span className={`px-2 py-0.5 rounded-full ${sideCount > 3 ? 'bg-red-100 text-red-700' : 'bg-gray-200'}`}>
                        Sides: {sideCount}/3
                    </span>
                </div>
            </div>
            {entreeCount > 1 && <p className="text-xs text-red-600 mt-1">Please select only 1 entrée.</p>}
            {sideCount > 3 && <p className="text-xs text-red-600 mt-1">Please select a maximum of 3 sides.</p>}
            {mealOrder.items.length > 0 ? (
                <div className="mt-2 space-y-3">
                    {categories.map(category => (
                        <div key={category}>
                            <h4 className="text-sm font-semibold text-gray-600 border-b border-gray-200 pb-1">{category}</h4>
                            <ul className="mt-1 space-y-1">
                                {groupedItems[category].map(({ item }) => (
                                    <li key={item.id} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                                        <span>{item.name}</span>
                                        <button onClick={() => onRemove(item.id)} className="text-rush-red hover:text-red-700" aria-label={`Remove ${item.name}`}>
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500 mt-2">No items selected for this meal.</p>
            )}
             <textarea
                value={mealOrder.specialNotes}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="Add special requests or allergy notes..."
                className="w-full mt-3 p-2 border border-gray-300 rounded-md text-sm focus:ring-rush-green focus:border-rush-green"
                rows={2}
            ></textarea>
            <div className="mt-3">
                <label className="flex items-center text-sm cursor-pointer">
                    <input
                        type="checkbox"
                        checked={mealOrder.needsDietitianReview || false}
                        onChange={(e) => onDietitianReviewChange(e.target.checked)}
                        className="h-4 w-4 text-rush-green focus:ring-rush-green border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">Request Dietitian Review for this meal</span>
                </label>
            </div>
        </div>
    );
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ order, activeMeal, setOrder, onReviewOrder }) => {

  const handleNotesChange = (notes: string) => {
    setOrder({
        ...order,
        meals: {
            ...order.meals,
            [activeMeal]: {
                ...(order.meals[activeMeal] || { items: [], specialNotes: '' }),
                specialNotes: notes,
            },
        },
    });
  };

  const handleDietitianReviewChange = (checked: boolean) => {
      setOrder({
        ...order,
        meals: {
            ...order.meals,
            [activeMeal]: {
                ...(order.meals[activeMeal] || { items: [], specialNotes: '' }),
                needsDietitianReview: checked,
            },
        },
    });
  }
  
  const handleRemoveItem = (itemId: number) => {
    if (!order.meals[activeMeal]) return;
    
    const newItems = order.meals[activeMeal]?.items.filter(oi => oi.item.id !== itemId) || [];
    setOrder({
        ...order,
        meals: {
            ...order.meals,
            [activeMeal]: {
                ...order.meals[activeMeal]!,
                items: newItems,
            },
        },
    });
  }

  const totalItems = (Object.keys(order.meals) as MealTime[]).reduce((acc, meal) => acc + (order.meals[meal]?.items.length || 0), 0);
  const activeMealOrder = order.meals[activeMeal] || { items: [], specialNotes: ''};

  return (
    <div className="bg-rush-gray-light p-6 rounded-lg shadow-md sticky top-8 no-print">
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-gray-700">My Full Order Summary</h3>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>Breakfast: {order.meals[MealTime.Breakfast]?.items.length || 0} items</li>
          <li>Lunch: {order.meals[MealTime.Lunch]?.items.length || 0} items</li>
          <li>Dinner: {order.meals[MealTime.Dinner]?.items.length || 0} items</li>
        </ul>
      </div>
      <hr className="my-4 border-gray-300" />
      <h2 className="text-2xl font-bold text-rush-green-dark border-b pb-3">Your {activeMeal} Order</h2>
      <div className="mt-4">
        <MealOrderSummary
            mealOrder={activeMealOrder}
            onNotesChange={handleNotesChange}
            onRemove={handleRemoveItem}
            onDietitianReviewChange={handleDietitianReviewChange}
        />
      </div>
       <button
        onClick={onReviewOrder}
        disabled={totalItems === 0}
        className="w-full mt-6 bg-rush-green text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rush-green disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Review My Full Order ({totalItems})
      </button>
       {totalItems === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">
            Your cart is empty. Add items from the menu to get started.
        </p>
        )}
    </div>
  );
};
