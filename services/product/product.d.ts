declare type ProductType = {
  uuid: string;
  title: string;
  description: string;
  category_uuid: string;
  images: string[];
  metadata: any[];
  prices: ProductPrice[];
  tags: any[];
  createdAt: string;
  updatedAt: string;
};

declare type ProductPrice = {
  title: string;
  value: number;
};
