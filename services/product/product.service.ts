import axiosPkg, { AxiosInstance } from "axios";

export class ProductService {
  static init(business_slug: string) {
    return new ProductService(business_slug);
  }

  private axios: AxiosInstance;

  constructor(business_slug: string) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error("Check Backend URL!");
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/product/${business_slug}`,
    });
  }

  getOne(product_uuid: string) {
    return this.axios
      .get<IResponseType<ProductType>>(`/${product_uuid}`)
      .then(({ data }) => data);
  }
}
