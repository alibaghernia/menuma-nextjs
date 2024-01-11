import axiosPkg, { AxiosInstance } from 'axios';

export class ProductService {
  static init(business_slug: string) {
    return new ProductService(business_slug);
  }

  private axios: AxiosInstance;

  constructor(business_slug: string) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/api/cafe-restaurants/${business_slug}/menu`,
    });
  }

  getOne(product_slug: string) {
    return this.axios
      .get<APIProduct>(`/items/${product_slug}`)
      .then(({ data }) => data);
  }
}
