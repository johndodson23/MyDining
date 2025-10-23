
import React, { useState, useEffect } from 'react';
import { Patient } from '../types';
import { RushLogo } from './Icons';

interface HeaderProps {
    patient: Patient | null;
    onLogout: () => void;
    onNavigateToHistory: () => void;
    isTimeLogicDisabled: boolean;
}

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="text-center md:text-left">
            <p className="font-semibold text-rush-green-dark text-sm">{formatDate(time)}</p>
            <p className="text-2xl font-bold text-gray-700">{formatTime(time)}</p>
        </div>
    );
}


export const Header: React.FC<HeaderProps> = ({ patient, onLogout, onNavigateToHistory }) => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24">
                    <div className="flex items-center gap-4">
                       <RushLogo className="h-10 w-auto" />
                    </div>
                    
                    <div className="hidden md:block">
                        <Clock />
                    </div>

                     {patient && (
                        <div className="flex items-center gap-4">
                             <button 
                                onClick={onNavigateToHistory}
                                className="bg-white hover:bg-gray-100 text-rush-green font-semibold py-2 px-4 rounded-lg text-sm transition-colors border border-rush-green"
                            >
                                View My Orders
                            </button>
                            <div className="text-right">
                                <p className="text-lg font-semibold text-rush-green-dark">{patient.name}</p>
                                <p className="text-base text-rush-gray-dark">Room: {patient.roomNumber}</p>
                            </div>
                            <button 
                                onClick={onLogout}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                            >
                                Logout (Switch Patient)
                            </button>
                        </div>
                     )}
                </div>
                 <div className="md:hidden pb-4 border-t border-gray-200">
                    <Clock />
                </div>
            </div>
        </header>
    );
}