
import { Patient, Diet } from '../types';

export const PATIENTS: Patient[] = [
  {
    id: 1,
    name: 'Jane Doe',
    roomNumber: '512A',
    diet: [Diet.General, Diet.HeartHealthy],
    allergies: ['Peanuts']
  },
  {
    id: 2,
    name: 'John Smith',
    roomNumber: '340B',
    diet: [Diet.Pediatric],
    allergies: []
  },
  {
    id: 3,
    name: 'Emily Jones',
    roomNumber: '701C',
    diet: [Diet.LowSodium, Diet.Diabetic, Diet.Renal],
    allergies: ['Shellfish']
  },
  {
    id: 4,
    name: 'Michael Brown',
    roomNumber: '822A',
    diet: [Diet.GlutenFriendly],
    allergies: []
  },
  {
    id: 5,
    name: 'Sarah Miller',
    roomNumber: '615D',
    diet: [Diet.Kosher],
    allergies: ['Dairy']
  }
];
