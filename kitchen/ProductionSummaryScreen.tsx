
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ORDERS } from './data/mockOrders';
import { Order, Item, MealTime, OrderStatus } from '../types';
import { PrintButton } from './components/PrintButton';

const aggregateItems = (orders: Order[], mealName: MealTime) => {
  const itemMap = new Map<number, { item: Item; count: number; notes: Map<string, number> }>();

  const relevantOrders = orders.filter(order =>
    order.meals[mealName] &&
    [OrderStatus.Confirmed, OrderStatus.InKitchen, OrderStatus.OnTheWay].includes(order.status)
  );

  for (const order of relevantOrders) {
    const mealOrder = order.meals[mealName];
    if (!mealOrder) continue;

    for (const orderItem of mealOrder.items) {
      if (!itemMap.has(orderItem.item.id)) {
        itemMap.set(orderItem.item.id, {
          item: orderItem.item,
          count: 0,
          notes: new Map<string, number>(),
        });
      }
      const entry = itemMap.get(orderItem.item.id)!;
      entry.count += orderItem.quantity;

      const note = mealOrder.specialNotes.trim();
      if (note) {
        entry.notes.set(note, (entry.notes.get(note) || 0) + 1);
      }
    }
  }
  return Array.from(itemMap.values());
};

const ProductionSummaryScreen = () => {
  const { meal } = useParams<{ meal: string }>();
  const mealTime = meal?.charAt(0).toUpperCase() + meal!.slice(1) as MealTime;

  const aggregatedItems = useMemo(() => {
    if (!mealTime || !Object.values(MealTime).includes(mealTime)) return {};
    const aggregated = aggregateItems(MOCK_ORDERS, mealTime);
    const groupedByCategory = aggregated.reduce((acc, current) => {
      const category = current.item.category;
      (acc[category] = acc[category] || []).push(current);
      return acc;
    }, {} as Record<string, typeof aggregated>);
    return groupedByCategory;
  }, [mealTime]);

  if (!mealTime) {
    return <div>Invalid meal time specified.</div>;
  }

  const categories = Object.keys(aggregatedItems).sort();

  return (
    <div>
      <div className="flex justify-between items-center mb-6 no-print">
        <div>
          <Link to="/kitchen" className="text-sm text-rush-green-dark hover:underline">&larr; Back to Dashboard</Link>
          <h1 className="text-3xl font-bold text-gray-800">Production Summary: {mealTime}</h1>
        </div>
        <PrintButton />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md printable-area">
        <h1 className="text-2xl font-bold text-center mb-4 hidden print:block">Production Summary: {mealTime} - {new Date().toLocaleDateString()}</h1>
        {categories.length > 0 ? categories.map(category => (
          <div key={category} className="mb-6 last:mb-0 break-inside-avoid">
            <h2 className="text-2xl font-semibold text-rush-green-dark border-b-2 border-rush-green pb-2 mb-4">{category}</h2>
            <ul className="space-y-3">
              {aggregatedItems[category].sort((a,b) => a.item.name.localeCompare(b.item.name)).map(({ item, count, notes }) => (
                <li key={item.id} className="p-2 bg-rush-gray-light rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{item.name}</span>
                    <span className="font-bold text-lg">{count}</span>
                  </div>
                  {notes.size > 0 && (
                    <div className="mt-2 pl-4 border-l-2 border-gray-300">
                      <p className="text-xs font-semibold text-gray-500">Special Notes:</p>
                      <ul className="text-xs text-gray-700 list-disc list-inside">
                        {Array.from(notes.entries()).map(([note, noteCount]) => (
                          <li key={note}>"{note}" ({noteCount})</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )) : <p className="text-center text-gray-500 py-10">No items to produce for this meal service.</p>}
      </div>
    </div>
  );
};

export default ProductionSummaryScreen;
