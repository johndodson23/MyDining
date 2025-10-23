
import React from 'react';
import { OrderStatus } from '../types';
import { CheckCircleIcon, ChefHatIcon, DeliveryTruckIcon, DishIcon } from './Icons';

interface OrderTrackerProps {
  status: OrderStatus;
}

const stages = [
  { status: OrderStatus.Confirmed, icon: CheckCircleIcon, label: 'Confirmed' },
  { status: OrderStatus.InKitchen, icon: ChefHatIcon, label: 'In the Kitchen' },
  { status: OrderStatus.OnTheWay, icon: DeliveryTruckIcon, label: 'Out for Delivery' },
  { status: OrderStatus.Delivered, icon: DishIcon, label: 'Delivered' },
];

export const OrderTracker: React.FC<OrderTrackerProps> = ({ status }) => {
  const currentStageIndex = stages.findIndex(s => s.status === status);

  return (
    <div className="w-full px-4 sm:px-8">
        <div className="flex items-center">
            {stages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                
                return (
                    <React.Fragment key={stage.status}>
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                ${isCompleted || isCurrent ? 'bg-rush-green' : 'bg-gray-300'}
                                ${isCurrent ? 'animate-pulse' : ''}
                                `}>
                                <stage.icon className="w-7 h-7 text-white" />
                            </div>
                            <p className={`mt-2 text-xs sm:text-sm font-semibold ${isCompleted ? 'text-rush-green-dark' : isCurrent ? 'text-rush-green-dark' : 'text-gray-500'}`}>
                                {stage.label}
                            </p>
                        </div>
                        {index < stages.length - 1 && (
                            <div className={`flex-auto border-t-4 ${isCompleted ? 'border-rush-green' : 'border-gray-300'}`}></div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    </div>
  );
};