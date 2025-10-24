
import React, { useState, useMemo } from 'react';
import { Order, OrderStatus, Patient, MealTime, MealOrder } from '../types';
import { MOCK_ORDERS } from './data/mockOrders';
import { PATIENTS } from '../data/patients';
import { useStaff } from './StaffContext';
import { Link } from 'react-router-dom';

const DietitianReviewQueue: React.FC = () => {
    const { role } = useStaff();
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    const ordersToReview = useMemo(() => {
        // FIX: Cast meal to MealOrder to resolve 'unknown' type and access 'needsDietitianReview'
        return orders.filter(o => Object.values(o.meals).some(meal => (meal as MealOrder)?.needsDietitianReview));
    }, [orders]);

    const handleApprove = (orderId: string, mealTime: MealTime) => {
        setOrders(prevOrders => prevOrders.map(o => {
            if (o.id === orderId && o.meals[mealTime]) {
                const newMeals = { ...o.meals };
                newMeals[mealTime]!.needsDietitianReview = false;
                return { 
                    ...o, 
                    meals: newMeals,
                    // If all reviews are done, move to confirmed
                    // FIX: Cast m to MealOrder to resolve 'unknown' type and access 'needsDietitianReview'
                    status: Object.values(newMeals).some(m => (m as MealOrder)?.needsDietitianReview) ? o.status : OrderStatus.Confirmed
                };
            }
            return o;
        }));
    };

    if (role !== 'dietitian' && role !== 'manager') {
        return (
            <div className="text-center p-10 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-rush-red">Access Denied</h2>
                <p className="mt-2 text-gray-600">You do not have permission to view this page.</p>
                <Link to="/kitchen" className="mt-4 inline-block bg-rush-green text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90">
                    Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dietitian Review Queue</h1>
            {ordersToReview.length > 0 ? (
                <div className="space-y-4">
                    {ordersToReview.map(order => {
                        const patient = PATIENTS.find(p => p.id === order.patientId);
                        if (!patient) return null;

                        return (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-rush-yellow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold text-rush-green-dark">{patient.name} - Rm {patient.roomNumber}</h2>
                                        <p className="text-sm text-gray-500">Allergies: {patient.allergies.join(', ') || 'None'}</p>
                                    </div>
                                    <span className="text-sm text-gray-600">Order #{order.id.slice(-6)}</span>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {Object.entries(order.meals).map(([mealTime, mealOrder]) => {
                                        // FIX: Cast mealOrder to MealOrder to resolve 'unknown' type and access 'needsDietitianReview'
                                        if (!mealOrder || !(mealOrder as MealOrder).needsDietitianReview) return null;
                                        return (
                                            <div key={mealTime} className="bg-yellow-50 p-3 rounded-md">
                                                <h3 className="font-semibold text-yellow-800">{mealTime}</h3>
                                                {/* FIX: Cast mealOrder to MealOrder to resolve 'unknown' type and access 'items' */}
                                                <p className="text-sm mt-1"><strong>Items:</strong> {(mealOrder as MealOrder).items.map(i => i.item.name).join(', ')}</p>
                                                {/* FIX: Cast mealOrder to MealOrder to resolve 'unknown' type and access 'specialNotes' */}
                                                <p className="text-sm mt-1"><strong>Note:</strong> <em className="italic">"{(mealOrder as MealOrder).specialNotes}"</em></p>
                                                <button 
                                                    onClick={() => handleApprove(order.id, mealTime as MealTime)}
                                                    className="mt-3 bg-rush-green text-white text-xs font-bold py-1 px-3 rounded-md hover:bg-opacity-80"
                                                >
                                                    Approve for Kitchen
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">The dietitian review queue is empty.</p>
                </div>
            )}
        </div>
    );
};

export default DietitianReviewQueue;