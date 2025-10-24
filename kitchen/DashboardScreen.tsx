
import React, { useState, useMemo } from 'react';
import { MealTime, OrderStatus } from '../types';
import { MOCK_ORDERS } from './data/mockOrders';
import { MealServiceCard } from './components/MealServiceCard';

const isSameDay = (d1?: Date, d2?: Date) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

const DashboardScreen = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const ordersForDate = useMemo(() => {
        return MOCK_ORDERS.filter(order => isSameDay(order.submittedAt, selectedDate));
    }, [selectedDate]);

    const getMealStats = (meal: MealTime) => {
        const mealOrders = ordersForDate.filter(o => o.meals[meal]);
        return {
            totalOrders: mealOrders.length,
            newOrders: mealOrders.filter(o => o.status === OrderStatus.Confirmed).length,
            inKitchenOrders: mealOrders.filter(o => o.status === OrderStatus.InKitchen).length,
            onTheWayOrders: mealOrders.filter(o => o.status === OrderStatus.OnTheWay).length,
        };
    };

    const breakfastStats = getMealStats(MealTime.Breakfast);
    const lunchStats = getMealStats(MealTime.Lunch);
    const dinnerStats = getMealStats(MealTime.Dinner);

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-800">Production Dashboard</h1>
              <div className="text-left sm:text-right">
                  <p className="font-semibold text-gray-700">{selectedDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-500">Displaying mock data for today.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MealServiceCard mealName={MealTime.Breakfast} {...breakfastStats} />
                <MealServiceCard mealName={MealTime.Lunch} {...lunchStats} />
                <MealServiceCard mealName={MealTime.Dinner} {...dinnerStats} />
            </div>
        </div>
    );
};

export default DashboardScreen;
