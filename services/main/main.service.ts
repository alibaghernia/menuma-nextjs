import { ISpecialDiscountProps } from '@/components/common/special_discount/types';
import axiosPkg, { AxiosInstance } from 'axios';
import moment from 'moment';
import { Business } from '../business/business';
import {
  Catalog,
  EventEntity,
  IGetDiscounts,
  IGetEvents,
  ISearchBusiness,
} from './main';

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

  getEvents(args?: IGetEvents) {
    return this.axios
      .get<AxiosResponseType<{ items: EventEntity[]; total: number }>>(
        `/events`,
        {
          params: args,
        },
      )
      .then(({ data }) => data);
  }
  searchBusiness(args?: ISearchBusiness) {
    return this.axios
      .get<AxiosResponseType<{ businesses: Business[]; total: number }>>(
        `/business`,
        { params: args },
      )
      .then(({ data }) => data);
  }
  getDiscounts(args: IGetDiscounts = {}): Promise<ISpecialDiscountProps[]> {
    // return this.axios
    //   .get<DiscountEntity[]>(`/api/discounts`, {
    //     params: args,
    //   })
    //   .then(({ data }) => data);

    return Promise.resolve([]);
  }
  getCatalogs(): Promise<Catalog[]> {
    return this.axios.get(`/api/catalogs`).then(({ data }) => data);
  }
  getCatalog(id: string): Promise<Catalog> {
    return this.axios.get(`/api/catalogs/${id}`).then(({ data }) => data);
  }
}
