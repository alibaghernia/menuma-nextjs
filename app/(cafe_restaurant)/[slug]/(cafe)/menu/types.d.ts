declare type APICateogory = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  background_path: any;
  cafe_restaurant_id: number;
  items: APIProductItem[];
};

declare interface APIProductItem {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_path: any;
  tags: any;
  prices: any;
  category_id: number | string;
  cafe_restaurant_id: number;
}

declare type category = {
  id: string;
  title: string;
  image: string;
  url?: string;
  onClick?: () => void;
};
