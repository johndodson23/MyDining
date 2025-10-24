
import { Order, OrderStatus, MealTime } from '../../types';
import { MENU_ITEMS } from '../../data/menuData';

const now = new Date();
const yesterday = new Date(new Date().setDate(now.getDate() - 1));

export const MOCK_ORDERS: Order[] = [
  {
    id: 'mock-order-1',
    patientId: 1, // Jane Doe
    status: OrderStatus.Confirmed,
    submittedAt: new Date(new Date().setHours(6, 30, 0, 0)),
    meals: {
      [MealTime.Breakfast]: {
        items: [
          { item: MENU_ITEMS.find(i => i.name === 'Scrambled Eggs')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Bacon')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Orange Juice')!, quantity: 1 },
        ],
        specialNotes: 'Extra crispy bacon please.',
      },
    },
  },
  {
    id: 'mock-order-2',
    patientId: 2, // John Smith
    status: OrderStatus.InKitchen,
    submittedAt: new Date(new Date().setHours(8, 0, 0, 0)),
    meals: {
      [MealTime.Lunch]: {
        items: [
          { item: MENU_ITEMS.find(i => i.name === 'Cheeseburger')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Air Fried Potato Chips')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Chocolate Milk')!, quantity: 1 },
        ],
        specialNotes: '',
      },
    },
  },
  {
    id: 'mock-order-3',
    patientId: 3, // Emily Jones
    status: OrderStatus.OnTheWay,
    submittedAt: new Date(new Date().setHours(11, 30, 0, 0)),
    meals: {
      [MealTime.Lunch]: {
        items: [
          { item: MENU_ITEMS.find(i => i.name === 'Salmon with Lemon Butter')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Brown Rice')!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Broccoli')!, quantity: 1 },
        ],
        specialNotes: 'Patient has a shellfish allergy. Ensure no cross-contamination.',
      },
    },
  },
  {
    id: 'mock-order-4',
    patientId: 4, // Michael Brown
    status: OrderStatus.Delivered,
    submittedAt: new Date(yesterday.setHours(14, 15, 0, 0)),
    meals: {
      [MealTime.Dinner]: {
        items: [
          { item: MENU_ITEMS.find(i => i.name === 'Pasta Marinara' && !!i.isVegan)!, quantity: 1 },
          { item: MENU_ITEMS.find(i => i.name === 'Side Salad')!, quantity: 1 },
        ],
        specialNotes: 'Gluten Friendly diet.',
      },
    },
  },
  {
      id: 'mock-order-5',
      patientId: 5, // Sarah Miller
      status: OrderStatus.Confirmed,
      submittedAt: new Date(new Date().setHours(8, 45, 0, 0)),
      meals: {
          [MealTime.Lunch]: {
              items: [
                  { item: MENU_ITEMS.find(i => i.name === 'Creamy Hummus & Rustic Grilled Vegetable Platter')!, quantity: 1 },
              ],
              specialNotes: 'Patient has a severe dairy allergy, please double check all ingredients for hidden dairy.',
              needsDietitianReview: true,
          }
      }
  },
  {
      id: 'mock-order-6',
      patientId: 6, // Alex Ray
      status: OrderStatus.Confirmed,
      submittedAt: new Date(new Date().setHours(7, 15, 0, 0)),
      meals: {
        [MealTime.Breakfast]: {
          items: [
            { item: MENU_ITEMS.find(i => i.name === 'Oatmeal')!, quantity: 1 },
            { item: MENU_ITEMS.find(i => i.name === 'Banana')!, quantity: 1 },
          ],
          specialNotes: '',
        },
        [MealTime.Lunch]: {
          items: [
              { item: MENU_ITEMS.find(i => i.name === 'Turkey Sandwich')!, quantity: 1 },
              { item: MENU_ITEMS.find(i => i.name === 'Apple Slices')!, quantity: 1 },
          ],
          specialNotes: 'No mayo on the sandwich.',
        }
      },
    },
    {
      id: 'mock-order-7',
      patientId: 1, // Jane Doe
      status: OrderStatus.Confirmed,
      submittedAt: new Date(new Date().setHours(8, 10, 0, 0)),
      meals: {
        [MealTime.Lunch]: {
          items: [
            { item: MENU_ITEMS.find(i => i.name === 'Grilled Chicken Caesar Salad')!, quantity: 1 }
          ],
          specialNotes: '',
        },
      },
    },
];
