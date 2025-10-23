
import React, { useState, useMemo, useCallback } from 'react';
import { Patient, Order, MealTime, Item, Diet, MealOrder } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { OrderSummary } from './OrderSummary';
import { MenuItem, ButtonState } from './MenuItem';
import { AlertIcon, HeartIcon } from './Icons';
import { isOrderingAvailable } from '../utils/time';

interface OrderingScreenProps {
  patient: Patient;
  order: Order;
  setOrder: (order: Order) => void;
  onReviewOrder: () => void;
  isTimeLogicDisabled: boolean;
  setIsTimeLogicDisabled: (disabled: boolean) => void;
}

const getDayOfWeek = (): number => {
    return new Date().getDay();
};

const isEntree = (item: Item): boolean => item.category.toLowerCase().includes('entrée');
const NON_SIDE_CATEGORIES = ['Beverages', 'Dessert', 'Fruit', 'Cereal', 'Dairy', 'Proteins', 'Bakery', 'Soup', 'Starters'];
const isSide = (item: Item): boolean => !isEntree(item) && !NON_SIDE_CATEGORIES.includes(item.category);

const categorySortOrder = ['Featured', 'Entrées', 'Breakfast Entrées', 'Soup', 'Starters'];

export const OrderingScreen: React.FC<OrderingScreenProps> = ({ patient, order, setOrder, onReviewOrder, isTimeLogicDisabled, setIsTimeLogicDisabled }) => {
  const allMeals = useMemo(() => Object.values(MealTime) as MealTime[], []);
  const initialMeal = allMeals.find(meal => isOrderingAvailable(meal, isTimeLogicDisabled)) || allMeals[0];
  
  const [activeMeal, setActiveMeal] = useState<MealTime>(initialMeal);
  const [heartHealthyOnly, setHeartHealthyOnly] = useState(false);
  
  const isHeartHealthyPatient = useMemo(() => patient.diet.includes(Diet.HeartHealthy), [patient.diet]);
  const today = getDayOfWeek();

  const currentMealOrder = order.meals[activeMeal] || { items: [], specialNotes: '' };
  const currentMealItems = currentMealOrder.items;
  const selectedEntree = currentMealItems.find(orderItem => isEntree(orderItem.item));
  const selectedSidesCount = currentMealItems.filter(orderItem => isSide(orderItem.item)).length;

  const menu = useMemo(() => {
    return MENU_ITEMS.filter(item => {
        const dietMatch = item.diets.some(d => patient.diet.includes(d));
        
        const allergyMatch = !item.allergens || !item.allergens.some(allergen => patient.allergies.includes(allergen));
        
        const mealMatch = item.mealTimes.includes(activeMeal);
        const dayMatch = !item.dayOfWeek || item.dayOfWeek.includes(today) || item.dayOfWeek.includes(-1);

        const heartHealthyMatch = !isHeartHealthyPatient || item.isHeartHealthy;
        
        const generalPatientFilter = !heartHealthyOnly || item.isHeartHealthy;

        return dietMatch && mealMatch && dayMatch && heartHealthyMatch && allergyMatch && generalPatientFilter;
    });
  }, [patient.diet, patient.allergies, activeMeal, today, isHeartHealthyPatient, heartHealthyOnly]);

  const groupedMenu = useMemo(() => {
    return menu.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {} as { [key: string]: Item[] });
  }, [menu]);

  const categories = Object.keys(groupedMenu).sort((a, b) => {
    const aIndex = categorySortOrder.findIndex(prefix => a.includes(prefix));
    const bIndex = categorySortOrder.findIndex(prefix => b.includes(prefix));

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });

  const updateMealOrder = (meal: MealTime, newMealOrder: MealOrder) => {
      setOrder({
        ...order,
        meals: {
            ...order.meals,
            [meal]: newMealOrder,
        }
      });
  };

  const addItemToOrder = useCallback((item: Item) => {
    let items = [...currentMealItems];
    
    if (isEntree(item)) {
        items = items.filter(oi => !isEntree(oi.item));
        items.push({ item, quantity: 1 });
    } else {
        const isAlreadyAdded = items.some(oi => oi.item.id === item.id);
        if (isAlreadyAdded) return;
        
        if(isSide(item) && selectedSidesCount >= 3) {
            return;
        }
        
        items.push({ item, quantity: 1 });
    }

    updateMealOrder(activeMeal, { ...currentMealOrder, items });
  }, [activeMeal, currentMealItems, selectedSidesCount, setOrder, order]);
  
  const removeItemFromOrder = useCallback((itemId: number) => {
     const items = currentMealItems.filter(orderItem => orderItem.item.id !== itemId);
     updateMealOrder(activeMeal, { ...currentMealOrder, items });
  }, [activeMeal, currentMealItems, setOrder, order]);

  if (!allMeals.some(meal => isOrderingAvailable(meal, isTimeLogicDisabled))) {
    return (
        <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-rush-green-dark">Ordering Closed for the Day</h1>
            <p className="text-rush-gray-dark mt-2">All meal ordering windows for today have passed. Please contact your nurse for assistance.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
         <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {patient.name}</h2>
                <p className="text-lg text-rush-gray-dark">You are ordering for your <strong>{patient.diet.join(', ')}</strong> diet.</p>
            </div>
            <div className="bg-yellow-100 border border-yellow-300 p-2 rounded-lg text-center text-xs font-semibold text-yellow-800 flex items-center flex-shrink-0">
                <label htmlFor="time-toggle" className="cursor-pointer">
                    Bypass<br/>Cutoff Times
                </label>
                <input
                    id="time-toggle"
                    type="checkbox"
                    checked={isTimeLogicDisabled}
                    onChange={(e) => setIsTimeLogicDisabled(e.target.checked)}
                    className="ml-2"
                />
            </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold text-rush-green-dark">Customize Your Dining</h1>
                <p className="text-rush-gray-dark mt-1">Select items for your <span className="font-semibold text-rush-green">{activeMeal}</span> below.</p>
            </div>
          </div>
            <div className="p-4 mb-4 bg-rush-gray-light border-l-4 border-rush-green-dark text-gray-800 rounded-r-lg" role="alert">
                <div className="flex items-center">
                    <AlertIcon className="w-6 h-6 mr-3 text-rush-green-dark" />
                    <div>
                        <p className="font-semibold">Your menu is filtered based on your profile:</p>
                        <ul className="list-disc list-inside text-sm mt-1">
                            <li><strong>Diet:</strong> {patient.diet.join(', ')}</li>
                            <li><strong>Allergies:</strong> {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'None listed'}</li>
                        </ul>
                    </div>
                </div>
            </div>
            {!isHeartHealthyPatient && patient.diet.includes(Diet.General) && (
              <div className="flex items-center justify-end mb-4">
                <label htmlFor="hh-toggle" className="flex items-center cursor-pointer">
                  <HeartIcon className="w-5 h-5 mr-2 text-red-500" />
                  <span className="mr-3 font-semibold text-gray-700">Show Heart Healthy Only</span>
                  <div className="relative">
                    <input id="hh-toggle" type="checkbox" className="sr-only" checked={heartHealthyOnly} onChange={() => setHeartHealthyOnly(prev => !prev)} />
                    <div className="block bg-gray-300 w-12 h-6 rounded-full"></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${heartHealthyOnly ? 'transform translate-x-6 bg-rush-green' : ''}`}></div>
                  </div>
                </label>
              </div>
            )}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-6" aria-label="Tabs">
              {allMeals.map((meal) => {
                  const isAvailable = isOrderingAvailable(meal, isTimeLogicDisabled);
                  const mealItems = order.meals[meal]?.items.length || 0;
                  return (
                    <button
                        key={meal}
                        onClick={() => setActiveMeal(meal)}
                        disabled={!isAvailable}
                        title={!isAvailable ? `The ordering window for ${meal} has closed.` : ''}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                            activeMeal === meal
                            ? 'border-rush-green text-rush-green'
                            : 'border-transparent text-gray-500'
                        } ${!isAvailable ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700 hover:border-gray-300'}`}
                    >
                        {meal} {mealItems > 0 && `(${mealItems})`}
                    </button>
                  )
              })}
            </nav>
          </div>

          <div className="mt-6 space-y-8">
            {categories.length > 0 ? categories.map(category => (
                <div key={category}>
                    <h2 className="text-2xl font-semibold text-rush-green-dark border-b-2 border-rush-green pb-2 mb-4">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {groupedMenu[category].map(item => {
                            const isAdded = currentMealItems.some(oi => oi.item.id === item.id);
                            let buttonState: ButtonState = 'add';
                            let disabledReason: string | undefined = undefined;

                            if (isAdded) {
                                buttonState = 'added';
                            } else if (isEntree(item)) {
                                if (selectedEntree) buttonState = 'swap';
                            } else if (isSide(item)) {
                                if (selectedSidesCount >= 3) {
                                    buttonState = 'disabled';
                                    disabledReason = "3 side limit reached";
                                }
                            }
                            
                            // An item is a "special" if its dayOfWeek array specifically contains the current day.
                            // This ensures the badge only shows for items meant for today, not for items available every day.
                            const isSpecial = (item.dayOfWeek || []).some(day => day === today);

                            return (
                                <MenuItem
                                    key={item.id}
                                    item={item}
                                    onAdd={() => addItemToOrder(item)}
                                    onRemove={() => removeItemFromOrder(item.id)}
                                    buttonState={buttonState}
                                    disabledReason={disabledReason}
                                    isSpecial={isSpecial}
                                />
                            )
                        })}
                    </div>
                </div>
            )) : <p className="text-center text-gray-500 py-10">No items available for this selection based on your assigned diet and allergies.</p>}
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <OrderSummary 
            order={order} 
            activeMeal={activeMeal}
            setOrder={setOrder} 
            onReviewOrder={onReviewOrder} 
        />
      </div>
    </div>
  );
};
