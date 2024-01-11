declare type BusinessType = {
  uuid: string;
  name: string;
  slug: string;
  status: string;
  pager: boolean;
  address: any;
  description: any;
  location_lat: any;
  location_long: any;
  phone_number: any;
  email: any;
  working_hours: any[];
  logo: any;
  banner: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  socials: Social[];
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
