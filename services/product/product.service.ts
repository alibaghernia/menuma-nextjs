import axiosPkg, { AxiosInstance } from 'axios';
import { ProductEntity } from '../business/business';

export class ProductService {
  static init(business_slug: string) {
    if (!business_slug) {
      console.error("You've didn't provide business slug to Product Service!");
    }
    return new ProductService(business_slug);
  }

  private axios: AxiosInstance;

  constructor(business_slug: string) {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/product/${business_slug}`,
    });
  }

  getOne(uuid: string) {
    return this.axios
      .get<AxiosResponseType<ProductEntity>>(`/${uuid}`)
      .then(({ data }) => data);
  }
}
