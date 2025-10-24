
import React, { useState, useMemo } from 'react';
import { useParams, NavLink, useLocation, Link } from 'react-router-dom';
import { Order, OrderStatus, MealTime, Patient } from '../types';
import { MOCK_ORDERS } from './data/mockOrders';
import { PATIENTS } from '../data/patients';
import { OrderCard } from './components/OrderCard';
import DigitalTicketView from './DigitalTicketView';

const TABS = [OrderStatus.Confirmed, OrderStatus.InKitchen, OrderStatus.OnTheWay];

const OrderQueueScreen = () => {
    const { meal } = useParams<{ meal: string }>();
    const location = useLocation();
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
    const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.Confirmed);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const mealTime = useMemo(() => meal?.charAt(0).toUpperCase() + meal!.slice(1) as MealTime, [meal]);
    
    const ordersForMeal = useMemo(() => orders.filter(o => o.meals[mealTime]), [orders, mealTime]);

    const getCountForTab = (status: OrderStatus) => {
        return ordersForMeal.filter(o => o.status === status).length;
    }

    const filteredOrders = useMemo(() => {
        return ordersForMeal
            .filter(o => o.status === activeTab)
            .sort((a, b) => (a.submittedAt?.getTime() || 0) - (b.submittedAt?.getTime() || 0));
    }, [ordersForMeal, activeTab]);
    
    const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
        setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
        setSelectedOrder(null);
    }
    
    const handleSelectOrder = (order: Order) => {
        setSelectedOrder(order);
    }

    const patientForOrder = selectedOrder ? PATIENTS.find(p => p.id === selectedOrder.patientId) : null;
    
    const mealNavLinks = [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner];

    return (
        <div className="h-full flex flex-col">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Order Fulfillment Queue</h1>
                 <div className="border-b border-gray-200 mt-4">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                      {mealNavLinks.map((m) => (
                        <Link
                            key={m}
                            to={`/kitchen/queue/${m.toLowerCase()}`}
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
                                mealTime === m
                                ? 'border-rush-green text-rush-green'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {m}
                        </Link>
                      ))}
                    </nav>
                </div>
            </div>

            <div className="flex border-b border-gray-200">
                {TABS.map(tabStatus => (
                    <button key={tabStatus} onClick={() => setActiveTab(tabStatus)}
                        className={`py-2 px-4 text-sm font-medium ${activeTab === tabStatus ? 'border-b-2 border-rush-green text-rush-green' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tabStatus} ({getCountForTab(tabStatus)})
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto pt-4 pr-2">
                {filteredOrders.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredOrders.map(order => {
                            const patient = PATIENTS.find(p => p.id === order.patientId);
                            if (!patient) return null;
                            return <OrderCard key={order.id} order={order} patient={patient} onClick={() => handleSelectOrder(order)} />
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No orders in this queue.</p>
                    </div>
                )}
            </div>

            {selectedOrder && patientForOrder && (
                <DigitalTicketView 
                    order={selectedOrder} 
                    patient={patientForOrder} 
                    mealTime={mealTime}
                    onClose={() => setSelectedOrder(null)} 
                    onUpdateStatus={handleUpdateStatus} 
                />
            )}
        </div>
    );
};

export default OrderQueueScreen;
