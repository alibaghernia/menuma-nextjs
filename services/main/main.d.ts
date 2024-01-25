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
  cafe_restaurant?: any;
};

declare type Catalog = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  short_description: string;
  long_description: string;
  image: string;
  label: string;
};

declare type ConditionalDiscount = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  cafe_restaurant_id: number;
};

declare type BusinessType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  logo_path?: null;
  banner_path?: null;
  slug: string;
  status: string;
  social_media?: null;
  working_hour1?: null;
  working_hour2?: null;
  address?: null;
  location_lat?: null;
  location_long?: null;
  description?: null;
  instagram?: null;
  telegram?: null;
  twitter?: null;
  has_pager: number;
  phone_number?: null;
  email?: null;
  whatsapp?: null;
  has_customer_club: number;
  enabled_customer_club: number;
  domain_address?: null;
  has_domain_address: number;
  enabled_pager: number;
  is_pinned: number;
  is_hidden: number;
  conditional_discounts?: ConditionalDiscount[];
  events?: any[];
};

declare interface ISearchBusiness {
  discounts?: boolean;
  all_fields?: string;
  has_event?: boolean;
  pin?: boolean;
  distance?: number;
  lat?: string;
  long?: string;
}
declare interface IGetDiscounts {
  is_pinned?: boolean;
  limit?: number;
}
declare interface IGetEvents {
  is_pinned?: boolean;
  limit?: number;
  from?: string;
  to?: string;
}
