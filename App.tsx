
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientApp from './components/PatientApp';
import KitchenApp from './kitchen/KitchenApp';
import { StaffProvider } from './kitchen/StaffContext';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PatientApp />} />
        <Route path="/kitchen/*" element={
          <StaffProvider>
            <KitchenApp />
          </StaffProvider>
        } />
      </Routes>
    </BrowserRouter>
  );
}
