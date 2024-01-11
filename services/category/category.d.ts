declare type CategoryType = {
  uuid: string;
  parent_uuid: any;
  title: string;
  slug: any;
  image: any;
  products?: ProductType[];
};

declare type GetCategoriesTypes = {
  categories: CategoryType[];
  total: number;
};
