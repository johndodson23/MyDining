
import React, { useState, useEffect } from 'react';
import { Patient, Order, MealTime, OrderStatus, Diet } from './types';
import { PATIENTS } from './data/patients';
import { PatientSelector } from './components/PatientSelector';
import { OrderingScreen } from './components/OrderingScreen';
import { OrderReviewScreen } from './components/OrderReviewScreen';
import { Header } from './components/Header';
import { TimeViolationScreen } from './components/TimeViolationScreen';
import { OrderHistoryScreen } from './components/OrderHistoryScreen';
import { OrderDetailScreen } from './components/OrderDetailScreen';

type Page = 'patient-select' | 'ordering' | 'review' | 'order-history' | 'order-detail' | 'time-violation';

const createNewOrderingOrder = (patientId: number): Order => ({
  id: `order-${Date.now()}`,
  patientId,
  status: OrderStatus.Ordering,
  meals: {},
});

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('patient-select');
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [viewingOrderId, setViewingOrderId] = useState<string | null>(null);
  const [violatedMeal, setViolatedMeal] = useState<MealTime | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTimeLogicDisabled, setIsTimeLogicDisabled] = useState(true);

  // Effect to simulate order progress for submitted orders
  useEffect(() => {
    const activeOrder = orders.find(o => o.id === viewingOrderId && o.status !== OrderStatus.Delivered && o.status !== OrderStatus.Ordering);
    if (!activeOrder) return;

    const timeouts: number[] = [];
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
    // For prototype: create a fresh set of orders each time.
    // In a real app, you'd fetch this from a server.
    const initialOrders: Order[] = [
        createNewOrderingOrder(patient.id),
        // Mock a past order
        {
            id: 'past-order-1',
            patientId: patient.id,
            status: OrderStatus.Delivered,
            submittedAt: new Date(Date.now() - 86400000), // 1 day ago
            meals: {
                [MealTime.Lunch]: {
                    items: [{ item: { id: 200, name: 'Turkey Sandwich', diets: [Diet.General], category: 'Daily Entrées', mealTimes: [MealTime.Lunch]}, quantity: 1}],
                    specialNotes: 'No mayo'
                }
            }
        }
    ];
    setOrders(initialOrders);
    setCurrentPage('ordering');
  };
  
  const logout = () => {
    setCurrentPatient(null);
    setOrders([]);
    setCurrentPage('patient-select');
  };
  
  const navigateToPage = (page: Page, orderId?: string) => {
    setCurrentPage(page);
    if (orderId) {
      setViewingOrderId(orderId);
    }
  };
  
  const submitOrder = () => {
    const orderingOrder = orders.find(o => o.status === OrderStatus.Ordering);
    if (!orderingOrder || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
        // Update the submitted order
        const submittedOrder: Order = {
            ...orderingOrder,
            status: OrderStatus.Confirmed,
            submittedAt: new Date(),
        };

        // Create a new blank order for the cart
        const newOrderingOrder = createNewOrderingOrder(orderingOrder.patientId);

        setOrders(prev => [...prev.filter(o => o.id !== orderingOrder.id), submittedOrder, newOrderingOrder]);
        navigateToPage('order-detail', submittedOrder.id);
        setIsSubmitting(false);
    }, 1500); // 1.5 second delay
  };
  
  const handleTimeViolation = (meal: MealTime) => {
    setViolatedMeal(meal);
    setCurrentPage('time-violation');
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
  };

  const renderPage = () => {
    if (!currentPatient) {
      return <PatientSelector patients={PATIENTS} onSelectPatient={selectPatient} />;
    }

    const currentOrderingOrder = orders.find(o => o.status === OrderStatus.Ordering);
    const viewingOrder = orders.find(o => o.id === viewingOrderId);

    switch (currentPage) {
      case 'ordering':
        return currentOrderingOrder ? (
          <OrderingScreen patient={currentPatient} order={currentOrderingOrder} setOrder={handleUpdateOrder} onReviewOrder={() => navigateToPage('review')} isTimeLogicDisabled={isTimeLogicDisabled} />
        ) : (
             <div className="text-center p-10">
                <h2 className="text-2xl font-semibold text-rush-green-dark">Loading your order...</h2>
            </div>
        );
      case 'review':
        return currentOrderingOrder ? (
            <OrderReviewScreen patient={currentPatient} order={currentOrderingOrder} onBack={() => navigateToPage('ordering')} onSubmit={submitOrder} onTimeViolation={handleTimeViolation} isSubmitting={isSubmitting} isTimeLogicDisabled={isTimeLogicDisabled} />
        ) : <p>Error: No order to review.</p>;
      case 'order-history':
        return <OrderHistoryScreen orders={orders} onSelectOrder={(id) => navigateToPage('order-detail', id)} onNewOrder={() => navigateToPage('ordering')} />;
      case 'order-detail':
        return viewingOrder ? (
            <OrderDetailScreen order={viewingOrder} onBack={() => navigateToPage('order-history')} />
        ) : <p>Order not found.</p>;
      case 'time-violation':
        return <TimeViolationScreen meal={violatedMeal} onBack={() => navigateToPage('review')} />;
      case 'patient-select':
      default:
        return <PatientSelector patients={PATIENTS} onSelectPatient={selectPatient} />;
    }
  };

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