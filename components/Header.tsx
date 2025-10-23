
import React, { useState, useEffect, useRef } from 'react';
import { Patient } from '../types';
import { RushLogo, SettingsIcon, OrdersIcon, LogoutIcon } from './Icons';

interface HeaderProps {
    patient: Patient | null;
    onLogout: () => void;
    onNavigateToHistory: () => void;
    isTimeLogicDisabled: boolean;
    setIsTimeLogicDisabled: (disabled: boolean) => void;
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


export const Header: React.FC<HeaderProps> = ({ patient, onLogout, onNavigateToHistory, isTimeLogicDisabled, setIsTimeLogicDisabled }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const settingsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
                setIsSettingsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                        <div className="flex items-center gap-6">
                            <div className="text-right">
                                <p className="text-lg font-semibold text-rush-green-dark">{patient.name}</p>
                                <p className="text-base text-rush-gray-dark">Room: {patient.roomNumber}</p>
                            </div>
                            <div className="h-12 border-l border-gray-300"></div>
                             <button 
                                onClick={onNavigateToHistory}
                                className="flex items-center gap-2 text-gray-600 hover:text-rush-green font-semibold text-sm transition-colors"
                            >
                                <OrdersIcon className="w-5 h-5" />
                                <span>View My Orders</span>
                            </button>

                            <div className="relative" ref={settingsRef}>
                                <button
                                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-rush-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rush-green"
                                    aria-label="Settings"
                                >
                                    <SettingsIcon className="w-6 h-6" />
                                </button>
                                {isSettingsOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10 border">
                                        <div className="px-4 py-2">
                                            <p className="text-sm font-semibold text-gray-700">Demo Settings</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                 <label htmlFor="time-toggle" className="text-xs text-gray-600 cursor-pointer">
                                                    Bypass Cutoff Times
                                                </label>
                                                <input
                                                    id="time-toggle"
                                                    type="checkbox"
                                                    checked={isTimeLogicDisabled}
                                                    onChange={(e) => setIsTimeLogicDisabled(e.target.checked)}
                                                    className="ml-2 h-4 w-4 text-rush-green focus:ring-rush-green border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                             <button 
                                onClick={onLogout}
                                className="flex items-center gap-2 text-gray-600 hover:text-rush-red font-semibold text-sm transition-colors"
                            >
                                <LogoutIcon className="w-5 h-5" />
                                <span>Logout</span>
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