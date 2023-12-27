import axiosPkg, { AxiosInstance } from "axios";

export class CategoryService {
  static init(business_slug: string) {
    return new CategoryService(business_slug);
  }

  private axios: AxiosInstance;

  constructor(business_slug: string) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error("Check Backend URL!");
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/category/${business_slug}`,
    });
  }

  get(withItems: boolean) {
    return this.axios
      .get<IResponseType<GetCategoriesTypes>>(`/`, {
        params: {
          with_items: withItems,
        },
      })
      .then(({ data }) => data);
  }
}
