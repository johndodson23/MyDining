
import React from 'react';
import { Order, OrderStatus, MealTime } from '../types';

interface OrderHistoryScreenProps {
  orders: Order[];
  onSelectOrder: (orderId: string) => void;
  onNewOrder: () => void;
}

const OrderCard: React.FC<{order: Order, onSelect: () => void}> = ({ order, onSelect }) => {
    const mealCount = Object.keys(order.meals).length;
    const totalItems = Object.values(order.meals).reduce((acc, meal) => acc + (meal?.items.length || 0), 0);
    const isOrdering = order.status === OrderStatus.Ordering;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">
                        {isOrdering ? "Your Active Cart" : `Order placed on ${order.submittedAt?.toLocaleDateString()}`}
                    </p>
                    <h3 className="text-xl font-bold text-rush-green-dark mt-1">
                        {isOrdering ? "Editing Your Order" : `Order #${order.id.slice(-6)}`}
                    </h3>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isOrdering ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {order.status}
                </span>
            </div>
            <p className="text-gray-600 mt-2">
                Contains {mealCount} meal{mealCount !== 1 && 's'}: {Object.keys(order.meals).join(', ')}
            </p>
            <p className="text-gray-500 text-sm mt-1">
                Total Items: {totalItems}
            </p>
            <button
                onClick={onSelect}
                className="w-full text-center mt-4 bg-rush-green text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
            >
                {isOrdering ? "Return to Menu" : "View / Track"}
            </button>
        </div>
    );
};

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({ orders, onSelectOrder, onNewOrder }) => {
  const orderingOrder = orders.find(o => o.status === OrderStatus.Ordering);
  const placedOrders = orders.filter(o => o.status !== OrderStatus.Ordering).sort((a,b) => (b.submittedAt?.getTime() || 0) - (a.submittedAt?.getTime() || 0));

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-rush-green-dark text-center mb-8">My Orders</h1>
      
      {orderingOrder && (
        <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2">In Progress</h2>
            <OrderCard order={orderingOrder} onSelect={onNewOrder} />
        </div>
      )}

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 pb-2 border-b-2">Placed Orders</h2>
        {placedOrders.length > 0 ? (
            <div className="space-y-4">
                {placedOrders.map(order => (
                    <OrderCard key={order.id} order={order} onSelect={() => onSelectOrder(order.id)} />
                ))}
            </div>
        ) : (
            <p className="text-center text-gray-500 py-10">You have no previously placed orders.</p>
        )}
      </div>
    </div>
  );
};