import { Business } from '../business/business';

export interface EventEntity {
  uuid: string;
  title: string;
  start_at: string;
  end_at: string;
  limit: number;
  banner_uuid: string;
  short_description: string;
  long_description: string;
  organizer_type: string;
  organizer_uuid: string;
  cycle: string;
  price: number;
  pin: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: null;
  banner_url: string;
  business?: BusinessType;
  user?: unknown;
}
export interface DiscountEntity {
  uuid: string;
  title: string;
  discount: number;
  description: string;
  pin: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  business_uuid: string;
  business?: Business;
}

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

declare type DiscountEntity = {
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
  conditional_discounts?: DiscountEntity[];
  events?: any[];
};

declare interface ISearchBusiness {
  pin?: boolean;
  distance?: string;
  location_lat?: string;
  location_long?: string;
  search?: string;
}
declare interface IGetDiscounts {
  is_pinned?: boolean;
  limit?: number;
}
declare interface IGetEvents {
  pin?: boolean;
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
}
