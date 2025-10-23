
import React from 'react';
import { MealTime } from '../types';
import { ClockIcon } from './Icons';

interface TimeViolationScreenProps {
    meal: MealTime | null;
    onBack: () => void;
}

const cutoffTimes = {
    [MealTime.Breakfast]: "7:00 p.m. the night before",
    [MealTime.Lunch]: "9:00 a.m. the same day",
    [MealTime.Dinner]: "3:00 p.m. the same day"
};

export const TimeViolationScreen: React.FC<TimeViolationScreenProps> = ({ meal, onBack }) => {
    if (!meal) return null;

    return (
        <div className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-lg border-t-8 border-rush-yellow">
            <ClockIcon className="w-24 h-24 text-rush-yellow mx-auto" />
            <h1 className="text-3xl font-bold text-rush-green-dark mt-6">Ordering Cutoff Has Passed</h1>
            <p className="text-lg text-rush-gray-dark mt-4">
                The ordering window for <strong>{meal}</strong> has closed.
            </p>
            <p className="mt-2 text-gray-500">
                Orders for {meal} must be placed by {cutoffTimes[meal]}.
            </p>
             <p className="mt-4 text-gray-600">
                A standard meal selection will be provided. Please contact your nurse if you have any questions.
            </p>
            <button
                onClick={onBack}
                className="mt-10 bg-rush-green text-white font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors"
            >
                Go Back and Adjust Order
            </button>
        </div>
    );
};