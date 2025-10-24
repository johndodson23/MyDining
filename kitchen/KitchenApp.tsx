
import React from 'react';
import { Routes, Route, NavLink, useLocation, Link } from 'react-router-dom';
import { RushLogo } from '../components/Icons';
import { RoleSwitcher } from './components/RoleSwitcher';
import DashboardScreen from './DashboardScreen';
import ProductionSummaryScreen from './ProductionSummaryScreen';
import OrderQueueScreen from './OrderQueueScreen';
import DietitianReviewQueue from './DietitianReviewQueue';
import { useStaff } from './StaffContext';
import { MOCK_ORDERS } from './data/mockOrders';
import { MealTime } from '../types';

const linkStyle = "flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-rush-gray-medium transition-colors";
const activeLinkStyle = "bg-rush-green text-white font-semibold hover:bg-rush-green";

const KitchenApp = () => {
  const { role } = useStaff();
  const location = useLocation();

  const dietitianReviewCount = MOCK_ORDERS.filter(o =>
    Object.values(o.meals).some(meal => meal?.needsDietitianReview)
  ).length;

  return (
    <div className="flex h-screen bg-rush-gray-light font-sans text-rush-gray-extradark">
      <aside className="w-64 bg-white flex flex-col p-4 border-r border-gray-200 no-print">
        <div className="flex items-center gap-2 mb-8">
          <RushLogo className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-rush-green-dark">Kitchen Portal</h1>
        </div>
        <nav className="flex flex-col space-y-2 flex-grow">
          <NavLink to="/kitchen" end className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Dashboard</NavLink>
          <NavLink to="/kitchen/queue/breakfast" className={() => `${linkStyle} ${location.pathname.startsWith('/kitchen/queue') ? activeLinkStyle : ''}`}>Order Queue</NavLink>

          {(role === 'manager' || role === 'dietitian') && (
            <NavLink to="/kitchen/dietitian-review" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>
              Dietitian Review
              {dietitianReviewCount > 0 && <span className="ml-auto bg-rush-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{dietitianReviewCount}</span>}
            </NavLink>
          )}

        </nav>
        <RoleSwitcher />
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-rush-green-dark hover:underline">
            &larr; Back to Patient View
          </Link>
        </div>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <Routes>
          <Route index element={<DashboardScreen />} />
          <Route path="queue/:meal" element={<OrderQueueScreen />} />
          <Route path="summary/:meal" element={<ProductionSummaryScreen />} />
          <Route path="dietitian-review" element={<DietitianReviewQueue />} />
        </Routes>
      </main>
    </div>
  );
};

export default KitchenApp;
