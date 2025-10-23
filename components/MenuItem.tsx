
import React from 'react';
import { Item } from '../types';
import { HeartIcon, LeafIcon, VeganIcon, PlusCircleIcon, CheckCircleIcon, SwapIcon } from './Icons';

export type ButtonState = 'add' | 'added' | 'swap' | 'disabled';

interface MenuItemProps {
  item: Item;
  onAdd: () => void;
  onRemove: () => void;
  buttonState: ButtonState;
  disabledReason?: string;
  isSpecial?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({ item, onAdd, onRemove, buttonState, disabledReason, isSpecial }) => {

  const handleWrapperClick = () => {
    if (buttonState === 'add' || buttonState === 'swap') {
      onAdd();
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent wrapper click from firing
    onRemove();
  }

  const renderButton = () => {
    switch (buttonState) {
      case 'add':
        return (
          <button onClick={onAdd} className="ml-4 text-rush-green hover:text-rush-green-dark transition-colors flex-shrink-0" aria-label={`Add ${item.name}`}>
            <PlusCircleIcon className="w-8 h-8"/>
          </button>
        );
      case 'added':
        return (
          <button onClick={handleRemoveClick} className="ml-4 text-green-600 hover:text-green-700 transition-colors flex-shrink-0" aria-label={`Remove ${item.name}`}>
             <CheckCircleIcon className="w-8 h-8"/>
          </button>
        );
      case 'swap':
        return (
          <button onClick={onAdd} className="ml-4 text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0 flex items-center gap-1.5" aria-label={`Swap for ${item.name}`}>
            <span className="text-sm font-semibold">Swap Entrée</span>
            <SwapIcon className="w-6 h-6"/>
          </button>
        );
      case 'disabled':
        return (
           <div className="ml-4 text-gray-400 flex-shrink-0" aria-label={`${item.name} disabled`}>
            <PlusCircleIcon className="w-8 h-8"/>
          </div>
        );
    }
  };

  return (
    <div
      onClick={handleWrapperClick}
      className={`bg-rush-gray-light p-4 rounded-lg flex items-start justify-between transition-opacity duration-300 
      ${buttonState === 'disabled' ? 'opacity-50 cursor-not-allowed' : ''}
      ${(buttonState === 'add' || buttonState === 'swap') ? 'cursor-pointer' : ''}
      `}
    >
      <div>
         {isSpecial && (
          <span className="mb-1.5 inline-block bg-rush-yellow text-yellow-800 text-xs font-bold px-2 py-0.5 rounded-full">
            Today's Special
          </span>
        )}
        <h3 className="font-semibold text-base text-gray-800">{item.name}</h3>
        {buttonState === 'disabled' && disabledReason && (
          <p className="text-xs text-red-600 font-medium mt-1">{disabledReason}</p>
        )}
        <div className="text-xs text-rush-gray-dark mt-1 flex items-center space-x-3">
          {item.carbCount !== undefined && <span>({item.carbCount}g carbs)</span>}
          <div className="flex items-center space-x-1">
            {item.isHeartHealthy && <HeartIcon className="w-4 h-4 text-red-500"><title>Heart Healthy</title></HeartIcon>}
            {item.isVegetarian && <LeafIcon className="w-4 h-4 text-green-600"><title>Vegetarian</title></LeafIcon>}
            {item.isVegan && <VeganIcon className="w-4 h-4 text-green-800"><title>Vegan</title></VeganIcon>}
          </div>
        </div>
         {item.subCategory && <p className="text-xs text-gray-500 italic mt-1">{item.subCategory}</p>}
      </div>
      {renderButton()}
    </div>
  );
};