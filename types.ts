export enum Diet {
  General = "General",
  Pediatric = "Pediatric",
  LowSodium = "Low Sodium",
  Renal = "Renal",
  Diabetic = "Diabetic",
  GlutenFriendly = "Gluten Friendly",
  Kosher = "Kosher",
  HeartHealthy = "Heart Healthy"
}

export enum MealTime {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner"
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  All = -1
}

export enum OrderStatus {
  Ordering = 'Ordering',
  Confirmed = 'Confirmed',
  InKitchen = 'In the Kitchen',
  OnTheWay = 'Out for Delivery',
  Delivered = 'Delivered'
}

export interface Patient {
  id: number;
  name: string;
  roomNumber: string;
  diet: Diet[];
  allergies: string[];
}

export interface Item {
  id: number;
  name: string;
  carbCount?: number;
  category: string;
  isHeartHealthy?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isRenal?: boolean;
  diets: Diet[];
  mealTimes: MealTime[];
  dayOfWeek?: DayOfWeek[]; // For daily specials
  subCategory?: string;
  allergens?: string[];
}

export interface OrderItem {
  item: Item;
  quantity: number;
}

export interface MealOrder {
  items: OrderItem[];
  specialNotes: string;
  needsDietitianReview?: boolean;
}

export interface Order {
  id: string;
  patientId: number;
  submittedAt?: Date;
  status: OrderStatus;
  meals: {
    [key in MealTime]?: MealOrder;
  };
};

export enum StaffRole {
    Staff = 'staff',
    Manager = 'manager',
    Dietitian = 'dietitian'
}

export interface Staff {
    id: string;
    name: string;
    role: StaffRole;
}
