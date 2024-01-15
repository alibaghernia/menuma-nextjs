declare type EventType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  capacity?: number;
  banner_path?: string;
  short_description?: string;
  long_description?: string;
  date: string;
  from: string;
  to?: string;
  cafe_restaurant_id: number;
};
