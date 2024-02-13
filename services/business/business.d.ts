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
  has_discount: boolean;
  has_event: boolean;
  has_menu: boolean;
  customer_club_enabled: boolean;
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

export interface IGetDiscountsFilter extends Partial<IPagination> {
  pin?: boolean;
  type: 'CONDITIONAL' | 'NORMAL' | 'ALL';
}
