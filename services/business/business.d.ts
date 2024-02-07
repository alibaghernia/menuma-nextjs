// declare type ConditionalDiscount = {
//   id: number;
//   created_at: string;
//   updated_at: string;
//   title: string;
//   description: string;
//   cafe_restaurant_id: number;
//   cafe_restaurant?: {
//     id: number;
//     logo_path: string;
//     slug: string;
//     name: string;
//   };
// };

// declare type BusinessType = {
//   id: number;
//   created_at: string;
//   updated_at: string;
//   name: string;
//   logo_path?: string;
//   banner_path?: string;
//   slug: string;
//   status: string;
//   social_media?: string;
//   working_hour1?: string;
//   working_hour2?: string;
//   address?: null;
//   location_lat?: string;
//   location_long?: string;
//   description?: string;
//   instagram?: string;
//   telegram?: string;
//   twitter?: string;
//   has_pager: number;
//   phone_number?: string;
//   email?: string;
//   whatsapp?: string;
//   has_customer_club: number;
//   enabled_customer_club: number;
//   domain_address?: string;
//   has_domain_address: number;
//   enabled_pager: number;
//   is_pinned: number;
//   is_hidden: number;
//   conditional_discounts?: ConditionalDiscount[];
//   events?: any[];
// };

// declare type Social = {
//   type: string;
//   link: string;
// };

// declare type TableType = {
//   uuid: string;
//   code: string;
//   createdAt: string;
//   updatedAt: string;
// };

export interface Business {
  uuid: string;
  name: string;
  slug: string;
  status: string;
  address: string;
  description: string;
  location_lat: string;
  location_long: string;
  phone_number: string;
  domain: string;
  email: string;
  working_hours?: WorkingHoursEntity[] | null;
  logo: string;
  logo_url?: string;
  banner: string;
  banner_url?: string;
  pager: boolean;
  customer_club: boolean;
  public: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
  socials?: SocialsEntity[] | null;
  users?: Pick<User, 'uuid'>[];
  distance?: number;
}
export interface WorkingHoursEntity {
  from: string;
  to: string;
  day: number;
}
export interface SocialsEntity {
  type: string;
  link: string;
}
export interface CategoryEntity {
  image: string;
  uuid: string;
  parent_uuid?: null;
  title: string;
  slug?: null;
  image_url: string;
}
export interface ProductEntity {
  uuid: string;
  title: string;
  description: string;
  metadata?: string[];
  prices: PricesEntity[];
  business_uuid: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  image_url?: string;
}
export interface PricesEntity {
  title: string;
  value: number;
}
export interface TableEntity {
  uuid: string;
  code: string;
  limit: number;
  description?: null;
  hall_uuid?: null;
  createdAt: string;
  updatedAt: string;
}
