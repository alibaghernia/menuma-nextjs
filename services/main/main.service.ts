import { ISpecialDiscountProps } from '@/components/common/special_discount/types';
import axiosPkg, { AxiosInstance } from 'axios';
import moment from 'moment';

export class MainService {
  static init() {
    return new MainService();
  }

  private axios: AxiosInstance;

  constructor() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}`,
    });
  }

  getEvents(): Promise<EventType[]> {
    return this.axios
      .get(`/api/events?limit=5&ispinned=1`)
      .then(({ data }) => data);
  }
  searchBusiness(args?: ISearchBusiness): Promise<BusinessType[]> {
    return this.axios
      .get(`/api/cafe-restaurants`, { params: args })
      .then(({ data }) => data);
  }
  getDiscounts(): Promise<ISpecialDiscountProps[]> {
    return this.axios
      .get<BusinessType[]>(`/api/cafe-restaurants`, {
        params: { discounts: true },
      })
      .then(({ data }) => {
        const discounts = data
          .map((bus) =>
            bus.conditional_discounts!.map((dis) => ({
              ...dis,
              business_slug: bus.slug,
              business_title: bus.name,
              business_logo: bus.logo_path,
            })),
          )
          .flat();
        return discounts;
      });
  }
  getCatalogs(): Promise<Catalog[]> {
    return this.axios.get(`/api/catalogs`).then(({ data }) => data);
  }
  getCatalog(id: string): Promise<Catalog> {
    return this.axios.get(`/api/catalogs/${id}`).then(({ data }) => data);
  }
}
