declare type APIProduct = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_path: any;
  tags: any;
  prices: IPrice[];
  category_id: string;
  cafe_restaurant_id: string;
};
declare type IPrice = {
  id: number;
  title: string;
  price: string;
};
