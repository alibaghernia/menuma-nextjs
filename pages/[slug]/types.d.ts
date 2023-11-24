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
  address: string;
  location_lat: string;
  location_long: string;
  description: string;
  instagram?: string;
  telegram?: string;
  twitter?: string;
}

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