import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';

export class BusinessService {
  static init() {
    return new BusinessService();
  }

  private axios: AxiosInstance;

  constructor() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/api/cafe-restaurants`,
    });
  }

  get(slug: string) {
    return this.axios.get<IProfile>(`/${slug}`).then(({ data }) => data);
  }
  getMenu(slug: string) {
    return this.axios.get<any>(`/${slug}/menu`).then(({ data }) => data);
  }
  getDailyOffers(slug: string) {
    return this.axios
      .get<APIProduct[]>(`/${slug}/menu/day-offers`)
      .then(({ data }) => data);
  }
  getApisBySlug(slug: string) {
    return {
      get: this.get.bind(this, slug),
      getDailyOffers: this.getDailyOffers.bind(this, slug),
    };
  }
  pager(business_uuid: string) {
    return {
      requestPager: (table_uuid: string) => {
        return this.axios
          .post<IResponseType<{ request_uuid: string }>>(
            `/${business_uuid}/pager-request`,
            {
              table_uuid,
            },
          )
          .then(({ data }) => data);
      },
      cancelRequestPager: (request_uuid: string) => {
        return this.axios.delete(
          `/${business_uuid}/pager-request/${request_uuid}`,
        );
      },
      getTable: (tableCode: string) => {
        return this.axios
          .get<IResponseType<TableType>>(
            `/${business_uuid}/get-table/${tableCode}`,
          )
          .then(({ data }) => data);
      },
    };
  }
}
