
import { MealTime } from '../types';

/**
 * Checks if the ordering window for a specific meal is still open.
 * In a real application, the current time should come from a secure server source
 * to prevent users from changing their local system time to bypass cutoffs.
 * 
 * @param meal The mealtime to check.
 * @param isDisabled A flag to bypass time logic for demo/testing.
 * @returns true if the ordering window is open, false otherwise.
 */
export const isOrderingAvailable = (meal: MealTime, isDisabled: boolean = false): boolean => {
    if (isDisabled) return true;

    const now = new Date();
    const hours = now.getHours();

    switch(meal) {
        case MealTime.Breakfast:
            // Order for TOMORROW. Open until 7 PM (19:00) tonight.
            return hours < 19;
        case MealTime.Lunch:
            // Order for TODAY. Open until 9 AM (09:00).
            return hours < 9;
        case MealTime.Dinner:
            // Order for TODAY. Open until 3 PM (15:00).
            return hours < 15;
        default:
            return true;
    }
};