
import React, { useState, useEffect } from 'react';
import { Patient, Order, MealTime, OrderStatus, Diet } from '../types';
import { PATIENTS } from '../data/patients';
import { PatientSelector } from './PatientSelector';
import { OrderingScreen } from './OrderingScreen';
import { OrderReviewScreen } from './OrderReviewScreen';
import { Header } from './Header';
import { TimeViolationScreen } from './TimeViolationScreen';
import { OrderHistoryScreen } from './OrderHistoryScreen';
import { OrderDetailScreen } from './OrderDetailScreen';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

const createNewOrderingOrder = (patientId: number): Order => ({
  id: `order-${Date.now()}`,
  patientId,
  status: OrderStatus.Ordering,
  meals: {},
});

export default function PatientApp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(null);
  const [violatedMeal, setViolatedMeal] = useState<MealTime | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeLogicDisabled, setIsTimeLogicDisabled] = useState(true);

  // Derive page from URL
  const getPageFromPath = (pathname: string): string => {
    if (pathname.includes('order-detail')) return 'order-detail';
    if (pathname.includes('order-history')) return 'order-history';
    if (pathname.includes('review')) return 'review';
    if (pathname.includes('time-violation')) return 'time-violation';
    if (currentPatient) return 'ordering';
    return 'patient-select';
  }
  const currentPage = getPageFromPath(location.pathname);

  useEffect(() => {
    const activeOrder = orders.find(o => o.id === viewingOrderId && o.status !== OrderStatus.Delivered && o.status !== OrderStatus.Ordering);
    if (!activeOrder) return;

    // FIX: Use ReturnType<typeof setTimeout> for broader compatibility (browser/Node) instead of NodeJS.Timeout.
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const stages = [OrderStatus.InKitchen, OrderStatus.OnTheWay, OrderStatus.Delivered];
    let delay = 5000; // 5 seconds for each stage

    stages.forEach((status, index) => {
      const timeout = setTimeout(() => {
        setOrders(prevOrders => prevOrders.map(o => o.id === activeOrder.id ? { ...o, status } : o));
      }, delay * (index + 1));
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [viewingOrderId, orders]);


  const selectPatient = (patient: Patient) => {
    setCurrentPatient(patient);
    const initialOrders: Order[] = [
        createNewOrderingOrder(patient.id),
        {
            id: 'past-order-1',
            patientId: patient.id,
            status: OrderStatus.Delivered,
            submittedAt: new Date(Date.now() - 86400000),
            meals: {
                [MealTime.Lunch]: {
                    items: [{ item: { id: 200, name: 'Turkey Sandwich', diets: [Diet.General], category: 'Daily Entrées', mealTimes: [MealTime.Lunch]}, quantity: 1}],
                    specialNotes: 'No mayo'
                }
            }
        }
    ];
    setOrders(initialOrders);
    navigate('/ordering');
  };
  
  const logout = () => {
    setCurrentPatient(null);
    setOrders([]);
    navigate('/');
  };
  
  const navigateToPage = (page: string, orderId?: string) => {
    if (orderId) {
      setViewingOrderId(orderId);
      navigate(`/${page}/${orderId}`);
    } else {
      navigate(`/${page}`);
    }
  };
  
  const submitOrder = () => {
    const orderingOrder = orders.find(o => o.status === OrderStatus.Ordering);
    if (!orderingOrder || isSubmitting) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
        const submittedOrder: Order = {
            ...orderingOrder,
            status: OrderStatus.Confirmed,
            submittedAt: new Date(),
        };
        const newOrderingOrder = createNewOrderingOrder(orderingOrder.patientId);
        setOrders(prev => [...prev.filter(o => o.id !== orderingOrder.id), submittedOrder, newOrderingOrder]);
        navigateToPage('order-detail', submittedOrder.id);
        setIsSubmitting(false);
    }, 1500);
  };
  
  const handleTimeViolation = (meal: MealTime) => {
    setViolatedMeal(meal);
    navigate('/time-violation');
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };
  
   const currentOrderingOrder = orders.find(o => o.status === OrderStatus.Ordering);
   const viewingOrder = orders.find(o => o.id === viewingOrderId);
   
   const renderPage = () => {
     if (!currentPatient) {
        return <PatientSelector patients={PATIENTS} onSelectPatient={selectPatient} />;
     }

     switch (currentPage) {
        case 'ordering':
            return currentOrderingOrder ? ( <OrderingScreen patient={currentPatient} order={currentOrderingOrder} setOrder={handleUpdateOrder} onReviewOrder={() => navigateToPage('review')} isTimeLogicDisabled={isTimeLogicDisabled} /> ) : 
            (<div className="text-center p-10"><h2 className="text-2xl font-semibold text-rush-green-dark">Loading your order...</h2></div>);
        case 'review':
             return currentOrderingOrder ? (<OrderReviewScreen patient={currentPatient} order={currentOrderingOrder} onBack={() => navigateToPage('ordering')} onSubmit={submitOrder} onTimeViolation={handleTimeViolation} isSubmitting={isSubmitting} isTimeLogicDisabled={isTimeLogicDisabled} />) : <p>Error: No order to review.</p>;
        case 'order-history':
             return <OrderHistoryScreen orders={orders} onSelectOrder={(id) => navigateToPage('order-detail', id)} onNewOrder={() => navigateToPage('ordering')} />;
        case 'order-detail':
            const id = location.pathname.split('/').pop();
            const orderToShow = orders.find(o => o.id === id);
            return orderToShow ? ( <OrderDetailScreen order={orderToShow} onBack={() => navigateToPage('order-history')} /> ) : <p>Order not found.</p>;
        case 'time-violation':
            return <TimeViolationScreen meal={violatedMeal} onBack={() => navigateToPage('review')} />;
        default:
            return <PatientSelector patients={PATIENTS} onSelectPatient={selectPatient} />;
     }
   }

  return (
    <div className="bg-rush-gray-light min-h-screen font-sans text-gray-800">
       <Header 
          patient={currentPatient} 
          onLogout={logout}
          onNavigateToHistory={() => navigateToPage('order-history')}
          isTimeLogicDisabled={isTimeLogicDisabled}
          setIsTimeLogicDisabled={setIsTimeLogicDisabled}
        />
       <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {renderPage()}
       </main>
    </div>
  );
}