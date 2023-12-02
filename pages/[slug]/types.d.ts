import { NextPage, FunctionComponent } from "next";

declare interface IProfile {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  logo_path: string;
  banner_path: string;
  slug: string;
  status: string;
  social_media?: any;
  working_hour1?: any;
  working_hour2?: any;
  working_hours?: WorkignHour[];
  address: string;
  location_lat: string;
  location_long: string;
  description: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
  twitter?: string;
  has_pager?: string;
  phone_number?: string;
  email?: string;
}

declare type WorkignHour = {
  id: number;
  created_at: any;
  updated_at: any;
  from: string;
  to: string;
  weekday: string;
  cafe_restaurant_id: number;
};

declare module "next" {
  interface NextPage {
    provider?: any;
  }
}
declare module "next" {
  interface FunctionComponent {
    provider?: any;
  }
}
