import React from 'react';
import { Patient, Diet } from '../types';
import { RushLogo } from './Icons';

interface PatientSelectorProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
}

const dietColors: { [key in Diet]?: string } = {
    [Diet.General]: "bg-blue-100 text-blue-800",
    [Diet.Pediatric]: "bg-pink-100 text-pink-800",
    [Diet.LowSodium]: "bg-yellow-100 text-yellow-800",
    [Diet.Renal]: "bg-indigo-100 text-indigo-800",
    [Diet.Diabetic]: "bg-purple-100 text-purple-800",
    [Diet.GlutenFriendly]: "bg-green-100 text-green-800",
    [Diet.Kosher]: "bg-gray-100 text-gray-800",
    [Diet.HeartHealthy]: "bg-red-100 text-red-800",
};


export const PatientSelector: React.FC<PatientSelectorProps> = ({ patients, onSelectPatient }) => {
  return (
    <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <RushLogo className="w-32 h-auto mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-rush-green-dark">Welcome to MyDining</h1>
            <p className="text-lg text-rush-gray-dark mt-2">This is a demonstration. Please select a patient profile to simulate their ordering experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
                <div key={patient.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:ring-2 hover:ring-rush-green transition-all duration-300 flex flex-col">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-semibold text-rush-green-dark">{patient.name}</h2>
                        <p className="text-rush-gray-dark">Room: {patient.roomNumber}</p>
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Assigned Diets</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {patient.diet.map(d => (
                                    <span key={d} className={`px-2 py-1 text-sm font-medium rounded-full ${dietColors[d] || 'bg-gray-200'}`}>{d}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Allergies</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {patient.allergies.length > 0 ? (
                                    patient.allergies.map(allergy => (
                                        <span key={allergy} className="px-2 py-1 text-sm font-medium rounded-full bg-rush-red text-white">{allergy}</span>
                                    ))
                                ) : (
                                    <span className="px-2 py-1 text-sm font-medium rounded-full bg-gray-100 text-gray-700">
                                        None Listed
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => onSelectPatient(patient)}
                        className="w-full mt-6 bg-rush-green text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rush-green"
                    >
                        Begin Ordering for {patient.name.split(' ')[0]}
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
};