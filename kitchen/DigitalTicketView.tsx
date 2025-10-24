
import React from 'react';
import { Order, OrderItem, Patient, OrderStatus, MealTime } from '../types';
import { AllergyWarningBanner } from './components/AllergyWarningBanner';
import { SpecialNoteBanner } from './components/SpecialNoteBanner';
import { PrintButton } from './components/PrintButton';
import { useStaff } from './StaffContext';

interface DigitalTicketViewProps {
  order: Order;
  patient: Patient;
  mealTime: MealTime;
  onClose: () => void;
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

const groupItemsByCategory = (items: OrderItem[]): { [category: string]: OrderItem[] } => {
  return items.reduce((acc, orderItem) => {
    const category = orderItem.item.category;
    (acc[category] = acc[category] || []).push(orderItem);
    return acc;
  }, {} as Record<string, OrderItem[]>);
};

const DigitalTicketView: React.FC<DigitalTicketViewProps> = ({ order, patient, mealTime, onClose, onUpdateStatus }) => {
  const { role } = useStaff();
  const mealOrder = order.meals[mealTime];

  if (!mealOrder) {
    return null; // Should not happen if opened from queue
  }

  const groupedItems = groupItemsByCategory(mealOrder.items);
  const categories = Object.keys(groupedItems);
  
  const nextStatusMap: Partial<Record<OrderStatus, OrderStatus>> = {
    [OrderStatus.Confirmed]: OrderStatus.InKitchen,
    [OrderStatus.InKitchen]: OrderStatus.OnTheWay,
    [OrderStatus.OnTheWay]: OrderStatus.Delivered,
  };
  
  const nextStatus = nextStatusMap[order.status];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 no-print" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="p-6 overflow-y-auto digital-ticket-print" id="ticket">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">ORDER TICKET</h2>
            <p className="font-semibold text-lg">{patient.name} - RM {patient.roomNumber}</p>
            <p>For: <span className="font-bold">{mealTime}</span> | Order #{order.id.slice(-6)}</p>
            <p className="text-xs">{order.submittedAt?.toLocaleString()}</p>
          </div>
          <hr className="my-2 border-dashed" />

          <AllergyWarningBanner allergies={patient.allergies} />
          <SpecialNoteBanner note={mealOrder.specialNotes} />
          
          <div className="space-y-3">
            {categories.map(category => (
              <div key={category}>
                <h4 className="font-bold border-b border-dashed uppercase">{category}</h4>
                <ul className="mt-1 space-y-0.5">
                  {groupedItems[category].map(({ item }) => (
                    <li key={item.id} className="text-lg">{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-rush-gray-light border-t flex items-center justify-between gap-2">
          {role === 'manager' && <button onClick={() => window.print()} className="bg-gray-500 text-white font-bold py-3 px-4 rounded-lg text-sm">Print Ticket</button>}
          <button onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors flex-grow">Close</button>
          {nextStatus && (
              <button onClick={() => onUpdateStatus(order.id, nextStatus)} className="bg-rush-green text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors flex-grow">
                  Mark as '{nextStatus}'
              </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalTicketView;
