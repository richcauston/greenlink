export interface Course {
  id: string;
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  rating: number;
  reviewCount: number;
  priceRange: [number, number];
  holes: 9 | 18 | 27 | 36;
  par: number;
  yards: number;
  image: string;
  amenities: Amenity[];
  description: string;
  bookingSystem: string;
}

export type Amenity =
  | "driving_range"
  | "cart_included"
  | "walking_allowed"
  | "restaurant"
  | "pro_shop"
  | "lessons"
  | "clubhouse"
  | "practice_green";

export const AMENITY_LABELS: Record<Amenity, string> = {
  driving_range: "Driving Range",
  cart_included: "Cart Included",
  walking_allowed: "Walking Allowed",
  restaurant: "Restaurant",
  pro_shop: "Pro Shop",
  lessons: "Lessons",
  clubhouse: "Clubhouse",
  practice_green: "Practice Green",
};

export interface TeeTime {
  id: string;
  courseId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  price: number;
  spotsRemaining: number;
  maxPlayers: number;
  cartIncluded: boolean;
}

export interface SearchParams {
  date: string;
  timeOfDay: "early_morning" | "morning" | "afternoon" | "evening" | "any";
  location: string;
  players: number;
}

export interface UserAlert {
  id: string;
  courseId: string;
  courseName: string;
  type: "any_opening" | "specific_time" | "price_drop";
  preferredDate?: string;
  preferredTime?: string;
  active: boolean;
}

export interface Booking {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  time: string;
  players: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
}

export const TIME_OF_DAY_LABELS: Record<SearchParams["timeOfDay"], string> = {
  early_morning: "Early Morning (6-8am)",
  morning: "Morning (8-11am)",
  afternoon: "Afternoon (11am-3pm)",
  evening: "Twilight (3pm+)",
  any: "Any Time",
};

export const PROVINCES = [
  "All Provinces",
  "Ontario",
  "British Columbia",
  "Alberta",
  "Quebec",
  "Nova Scotia",
  "Manitoba",
] as const;
