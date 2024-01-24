declare type ConditionalDiscount = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  cafe_restaurant_id: number;
  cafe_restaurant?: {
    id: number;
    logo_path: string;
    slug: string;
    name: string;
  };
};

declare type BusinessType = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  logo_path?: string;
  banner_path?: string;
  slug: string;
  status: string;
  social_media?: string;
  working_hour1?: string;
  working_hour2?: string;
  address?: null;
  location_lat?: string;
  location_long?: string;
  description?: string;
  instagram?: string;
  telegram?: string;
  twitter?: string;
  has_pager: number;
  phone_number?: string;
  email?: string;
  whatsapp?: string;
  has_customer_club: number;
  enabled_customer_club: number;
  domain_address?: string;
  has_domain_address: number;
  enabled_pager: number;
  is_pinned: number;
  is_hidden: number;
  conditional_discounts?: ConditionalDiscount[];
  events?: any[];
};

declare type Social = {
  type: string;
  link: string;
};

declare type TableType = {
  uuid: string;
  code: string;
  createdAt: string;
  updatedAt: string;
};
