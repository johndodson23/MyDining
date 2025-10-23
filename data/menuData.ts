import { Item, Diet, MealTime, DayOfWeek } from '../types';

// Helper function to create items for cleaner code
const createItem = (item: Omit<Item, 'id'>, id: number): Item => ({ ...item, id });

let idCounter = 1;

// Menu based on RUSH MyDining menu images provided
const rawItems: Omit<Item, 'id'>[] = [
    // --- BREAKFAST ---
    
    // Cereal (Breakfast Daily)
    { name: 'Oatmeal', carbCount: 13, category: 'Cereal', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric, Diet.HeartHealthy], mealTimes: [MealTime.Breakfast] },
    { name: 'Grits', carbCount: 20, category: 'Cereal', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Cheerios®', carbCount: 14, category: 'Cereal', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Corn Flakes', carbCount: 18, category: 'Cereal', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Rice Krispies®', carbCount: 16, category: 'Cereal', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Raisin Bran®', carbCount: 27, category: 'Cereal', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    
    // Fruit (Daily)
    { name: 'Applesauce', carbCount: 12, category: 'Fruit', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric, Diet.HeartHealthy], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Diced Peaches', carbCount: 14, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Diced Pears', carbCount: 21, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Oranges', carbCount: 16, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Apple Slices', carbCount: 14, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Stewed Prunes', carbCount: 24, category: 'Fruit', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Watermelon', carbCount: 8, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Fresh Fruit Cup', carbCount: 18, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Banana', carbCount: 29, category: 'Fruit', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    
    // Beverages (Daily)
    { name: 'Coffee', category: 'Beverages', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Decaf Coffee', category: 'Beverages', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Tea', category: 'Beverages', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Herbal Tea', category: 'Beverages', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Iced Tea', category: 'Beverages', diets: [Diet.General], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Hot Chocolate', carbCount: 25, category: 'Beverages', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Diet Hot Chocolate', carbCount: 12, category: 'Beverages', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric, Diet.Diabetic], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Milk', carbCount: 11, subCategory: 'Whole, 2%, Skim', category: 'Beverages', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Chocolate Milk', carbCount: 20, category: 'Beverages', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Soy Milk', carbCount: 19, category: 'Beverages', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Orange Juice', carbCount: 11, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Prune Juice', carbCount: 20, category: 'Beverages', isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    { name: 'Apple Juice', carbCount: 13, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Cranberry Juice', carbCount: 15, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Grape Juice', carbCount: 17, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Lemonade', carbCount: 12, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Diet Lemonade', carbCount: 1, category: 'Beverages', isVegan: true, diets: [Diet.General, Diet.Pediatric, Diet.Diabetic], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Fruit Punch', carbCount: 17, category: 'Beverages', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },

    // Proteins (Breakfast Daily)
    { name: 'Hard Cooked Egg', carbCount: 0, category: 'Proteins', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Scrambled Eggs', carbCount: 0, category: 'Proteins', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Scrambled Egg Whites', carbCount: 0, category: 'Proteins', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    { name: 'Breakfast Sandwich', carbCount: 32, category: 'Proteins', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Chicken Sausage', carbCount: 0, category: 'Proteins', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Pork Sausage', carbCount: 0, category: 'Proteins', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Bacon', carbCount: 0, category: 'Proteins', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Plant Based Sausage', carbCount: 1, category: 'Proteins', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    
    // Dairy (Breakfast Daily)
    { name: 'String Cheese', carbCount: 1, category: 'Dairy', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Cottage Cheese', carbCount: 3, category: 'Dairy', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Yogurt', carbCount: 17, subCategory: 'Vanilla (23), Blueberry (14), Strawberry (14)', category: 'Dairy', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Dairy Free Vanilla Yogurt', carbCount: 21, category: 'Dairy', isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    
    // Bakery (Daily)
    { name: 'English Muffin', carbCount: 29, category: 'Bakery', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    { name: 'Blueberry Muffin', carbCount: 29, category: 'Bakery', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'White/Wheat Toast', carbCount: 15, category: 'Bakery', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'White/Wheat Bread', carbCount: 15, category: 'Bakery', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Graham Crackers', carbCount: 11, category: 'Bakery', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast, MealTime.Lunch, MealTime.Dinner] },
    { name: 'Mini Bagel', carbCount: 15, category: 'Bakery', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Dinner Roll', carbCount: 18, category: 'Bakery', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Saltine Crackers', carbCount: 4, category: 'Bakery', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    
    // Breakfast Features (Daily)
    { name: 'French Toast (Daily)', carbCount: 35, category: 'Breakfast Entrées', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Pancakes (Daily)', carbCount: 25, category: 'Breakfast Entrées', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Home Fried Potatoes', carbCount: 21, category: 'Breakfast Sides', dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Blueberry Sauce', carbCount: 11, category: 'Breakfast Sides', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Strawberry Sauce', carbCount: 7, category: 'Breakfast Sides', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Whipped Topping', carbCount: 2, category: 'Breakfast Sides', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Syrup', carbCount: 29, category: 'Breakfast Sides', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Sugar Free Syrup', carbCount: 4, category: 'Breakfast Sides', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.All], diets: [Diet.General, Diet.Pediatric, Diet.Diabetic], mealTimes: [MealTime.Breakfast] },

    // Breakfast Features (Specials)
    { name: 'French Toast', carbCount: 35, category: 'Breakfast Entrées', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.Monday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Mini Breakfast Burrito', carbCount: 24, category: 'Breakfast Entrées', isHeartHealthy: true, dayOfWeek: [DayOfWeek.Monday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Overnight Oats', carbCount: 35, category: 'Breakfast Entrées', isHeartHealthy: true, dayOfWeek: [DayOfWeek.Tuesday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Denver Scrambler', carbCount: 1, category: 'Breakfast Entrées', dayOfWeek: [DayOfWeek.Tuesday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Yogurt Parfait', carbCount: 27, category: 'Breakfast Entrées', isHeartHealthy: true, isVegetarian: true, dayOfWeek: [DayOfWeek.Wednesday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Breakfast Sandwich (Weds)', carbCount: 28, category: 'Breakfast Entrées', dayOfWeek: [DayOfWeek.Wednesday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'French Toast Bake', carbCount: 47, category: 'Breakfast Entrées', dayOfWeek: [DayOfWeek.Thursday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Chilaquiles', carbCount: 8, category: 'Breakfast Entrées', dayOfWeek: [DayOfWeek.Thursday], diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    { name: 'Biscuit and Gravy', carbCount: 26, category: 'Breakfast Entrées', dayOfWeek: [DayOfWeek.Friday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Apple Strudel', carbCount: 15, category: 'Breakfast Entrées', isHeartHealthy: true, dayOfWeek: [DayOfWeek.Friday, DayOfWeek.All], diets: [Diet.General], mealTimes: [MealTime.Breakfast] },
    { name: 'Three Cheese Scrambler', carbCount: 0, category: 'Breakfast Entrées', isVegetarian: true, dayOfWeek: [DayOfWeek.Saturday], diets: [Diet.General], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Cheese Blintz', carbCount: 29, category: 'Breakfast Entrées', isHeartHealthy: true, isVegetarian: true, dayOfWeek: [DayOfWeek.Saturday], diets: [Diet.General], mealTimes: [MealTime.Breakfast], allergens: ['Dairy'] },
    { name: 'Pancakes (Sun)', carbCount: 25, category: 'Breakfast Entrées', isHeartHealthy: true, isVegan: true, dayOfWeek: [DayOfWeek.Sunday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    { name: 'Scrambled Eggs (Sun)', carbCount: 0, category: 'Breakfast Entrées', isHeartHealthy: true, isVegetarian: true, dayOfWeek: [DayOfWeek.Sunday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Breakfast] },
    

    // --- LUNCH & DINNER A LA CARTE ---

    // Soups
    { name: 'Chicken Noodle Soup', carbCount: 6, category: 'Soups', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Cream of Tomato Soup', carbCount: 11, category: 'Soups', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Cream of Mushroom Soup', carbCount: 8, category: 'Soups', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Broth', carbCount: 1, subCategory: 'Chicken, Beef, or Vegetable', category: 'Soups', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    
    // Starches
    { name: 'Homemade Mashed Potatoes', carbCount: 15, category: 'Starches', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Mashed Sweet Potatoes', carbCount: 18, category: 'Starches', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Roasted Red Potatoes', carbCount: 24, category: 'Starches', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'White Rice', carbCount: 17, category: 'Starches', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Brown Rice', carbCount: 26, category: 'Starches', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Golden Noodles', carbCount: 38, category: 'Starches', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Macaroni and Cheese (Side)', carbCount: 16, category: 'Starches', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Air Fried Potato Chips', carbCount: 18, category: 'Starches', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Pretzels', carbCount: 22, category: 'Starches', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Goldfish Crackers', carbCount: 27, category: 'Starches', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    
    // Vegetables
    { name: 'Corn', carbCount: 24, category: 'Vegetables', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Carrots', carbCount: 8, category: 'Vegetables', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Broccoli', carbCount: 6, category: 'Vegetables', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Green Beans', carbCount: 5, category: 'Vegetables', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Side Salad', carbCount: 2, category: 'Vegetables', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Salad Dressing', subCategory: 'Ranch (14), Caesar (3), Italian (4)♥, Balsamic (5)♥, French (9), Honey Mustard (19), Red Wine Vinaigrette (3)♥V', category: 'Vegetables', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Roasted Garlic Cauliflower', carbCount: 4, category: 'Vegetables', dayOfWeek: [DayOfWeek.Monday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Broccoli Florets', carbCount: 6, category: 'Vegetables', dayOfWeek: [DayOfWeek.Tuesday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Roasted Brussel Sprouts', carbCount: 9, category: 'Vegetables', dayOfWeek: [DayOfWeek.Wednesday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Roasted Vegetables', carbCount: 8, category: 'Vegetables', dayOfWeek: [DayOfWeek.Thursday, DayOfWeek.Saturday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Mustard Greens', carbCount: 4, category: 'Vegetables', dayOfWeek: [DayOfWeek.Friday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Green Beans (Sunday)', carbCount: 5, category: 'Vegetables', dayOfWeek: [DayOfWeek.Sunday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    
    // Desserts
    { name: 'Gelatin', carbCount: 18, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Pudding', carbCount: 26, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Ice Cream', carbCount: 31, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Chocolate Chip Cookie', carbCount: 26, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Peanuts', 'Dairy'] },
    { name: 'Angel Food Cake', carbCount: 28, category: 'Desserts', diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Pound Cake', carbCount: 34, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Apple Pie', carbCount: 68, category: 'Desserts', diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Sugar Free Gelatin', carbCount: 0, category: 'Desserts', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric, Diet.Diabetic], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Italian Ice', carbCount: 18, category: 'Desserts', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Brownie', carbCount: 53, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Sugar Cookie', carbCount: 19, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Strawberry Layer Cake', carbCount: 14, category: 'Desserts', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Blueberry Bar', carbCount: 16, category: 'Desserts', diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },

    // Daily Entrées (Lunch & Dinner)
    { name: 'Grilled Chicken Caesar Salad', carbCount: 8, category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Crispy Mixed Greens & Hearty Chicken Salad', carbCount: 32, category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Creamy Hummus & Rustic Grilled Vegetable Platter', carbCount: 55, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Turkey Sandwich', carbCount: 23, category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Grilled Vegetable Sandwich', carbCount: 36, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Peanut Butter & Grape Jelly Uncrustables® Sandwich', carbCount: 31, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Peanuts'] },
    { name: 'Hamburger', carbCount: 17, category: 'Daily Entrées', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Cheeseburger', carbCount: 18, category: 'Daily Entrées', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Natural Garden Burger Patty', carbCount: 41, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Grilled Cheese Sandwich', carbCount: 46, category: 'Daily Entrées', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Chicken Tenders', carbCount: 16, category: 'Daily Entrées', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Oven Baked Chick\'n Nuggets', carbCount: 22, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Hot Dog', carbCount: 29, category: 'Daily Entrées', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'BBQ Chick\'n Sandwich', carbCount: 41, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Cheese Pizza', carbCount: 27, category: 'Daily Entrées', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Cheez Pizza', carbCount: 30, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Pasta Marinara', carbCount: 62, category: 'Daily Entrées', isHeartHealthy: true, isVegan: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Macaroni & Cheese', carbCount: 44, category: 'Daily Entrées', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Grilled Chicken', carbCount: 1, category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Cheese Chile Relleno', carbCount: 5, category: 'Daily Entrées', isHeartHealthy: true, isVegetarian: true, diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Pot Roast with Gravy', carbCount: 3, category: 'Daily Entrées', diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Chicken Tamale', carbCount: 18, category: 'Daily Entrées', diets: [Diet.General], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Salmon with Lemon Butter', carbCount: 1, category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    { name: 'Whitefish', carbCount: 1, subCategory: 'Teriyaki (13) or Lemon Butter (1)', category: 'Daily Entrées', isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch, MealTime.Dinner] },
    
    // --- LUNCH & DINNER FEATURES ---
    
    // Monday
    { name: 'Meatloaf with Mushroom & Gravy (L)', carbCount: 11, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Monday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Chicken Parmesan', carbCount: 17, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Monday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Chicken Tetrazzini', carbCount: 43, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Monday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner], allergens: ['Dairy'] },
    { name: 'Grilled Vegetable Sandwich (D)', carbCount: 36, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Monday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },
    
    // Tuesday
    { name: 'BBQ Chicken Sandwich', carbCount: 32, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Tuesday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch] },
    { name: 'Pot Roast with Gravy (L)', carbCount: 3, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Tuesday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch] },
    { name: 'Roasted Vegetable Lasagna', carbCount: 17, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Tuesday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },
    { name: 'Santa Fe Salad', carbCount: 10, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Tuesday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },

    // Wednesday
    { name: 'Italian Beef Sandwich', carbCount: 26, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Wednesday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch] },
    { name: 'Mediterranean Salad', carbCount: 19, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Wednesday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Chicken Pot Pie', carbCount: 35, subCategory: 'over Biscuit (35) or Rice (22)', category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Wednesday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner] },
    { name: 'Swedish Meatballs', carbCount: 9, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Wednesday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner] },

    // Thursday
    { name: 'RUSH Club Burger', carbCount: 45, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Thursday], diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch] },
    { name: 'Mandarin Chicken Salad', carbCount: 12, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Thursday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Roast Turkey with Gravy', carbCount: 6, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Thursday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner] },
    { name: 'Meatloaf with Mushroom & Gravy (D)', carbCount: 11, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Thursday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },

    // Friday
    { name: 'Cajun Catfish', carbCount: 2, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Friday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Turkey Submarine Sandwich', carbCount: 28, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Friday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Lunch] },
    { name: 'Beef Stir Fry', carbCount: 11, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Friday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },
    { name: 'Mediterranean Bowl', carbCount: 52, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Friday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },

    // Saturday
    { name: 'Lemon Chicken', carbCount: 1, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Saturday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Chopped Salad', carbCount: 28, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Saturday], diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Pot Roast with Gravy (D)', carbCount: 3, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Saturday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner] },
    { name: 'California Turkey Burger', carbCount: 34, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Saturday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },

    // Sunday
    { name: 'Roasted Vegetable Stuffed Pepper', carbCount: 30, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Sunday], isHeartHealthy: true, isVegan: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Craisin Chicken Salad Pita Sandwich', carbCount: 26, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Sunday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Lunch] },
    { name: 'Smothered Chicken', carbCount: 5, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Sunday], isHeartHealthy: true, diets: [Diet.General], mealTimes: [MealTime.Dinner] },
    { name: 'Salmon with Lemon Butter (D)', carbCount: 1, category: 'Featured Entrées', dayOfWeek: [DayOfWeek.Sunday], isHeartHealthy: true, diets: [Diet.General, Diet.Pediatric], mealTimes: [MealTime.Dinner] },
];

export const MENU_ITEMS: Item[] = rawItems.map(item => {
    // If an item is vegan, it's also vegetarian
    if(item.isVegan && item.isVegetarian === undefined) {
        item.isVegetarian = true;
    }
    return createItem(item, idCounter++);
});
