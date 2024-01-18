import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { CustomerClubService } from './customer_club/customer_club.service';
import { EventsService } from './events/events.service';
import { ConditionsService } from './conditions/conditions.service';

export class BusinessService {
  static init(slug?: string) {
    return new BusinessService(slug);
  }

  public axios: AxiosInstance;
  private slug?: string;
  public backendURL?: string;

  constructor(slug?: string) {
    this.backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (slug) this.slug = slug;
    if (!this.backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${this.backendURL}/api/cafe-restaurants${
        slug ? `/${slug}` : ''
      }`,
    });
  }

  get businessSlug() {
    if (!this.slug)
      throw new NError({
        title: 'BusinessSlug is not specified!',
        statusCode: 500,
      });
    return this.slug;
  }
  get customerClubService() {
    return CustomerClubService.init(this);
  }
  get eventsService() {
    return EventsService.init(this);
  }
  get conditionsService() {
    return ConditionsService.init(this);
  }
  private slugRoute(slug?: string) {
    if (slug && this.slug)
      throw new NError({
        statusCode: 500,
        title: 'Only pass the slug to method or BusinessService constructor!',
      });
    if (slug) return `/${slug}`;
    return '';
  }
  get(slug?: string) {
    return this.axios
      .get<IProfile>(this.slugRoute(slug))
      .then(({ data }) => data);
  }
  getMenu(slug?: string) {
    return this.axios
      .get<any>(`${this.slugRoute(slug)}/menu`)
      .then(({ data }) => data);
  }
  getDailyOffers(slug?: string) {
    return this.axios
      .get<APIProduct[]>(`${this.slugRoute(slug)}/menu/day-offers`)
      .then(({ data }) => data);
  }
  getTable(tableID: string, cafe_slug?: string) {
    return this.axios.get<TableType>(
      `${this.slugRoute(cafe_slug)}/tables/${tableID}`,
    );
  }
  callGarson(tableID: string, cafe_slug?: string) {
    return this.axios.post(
      `${this.slugRoute(cafe_slug)}/waiter_pager/${tableID}/call`,
    );
  }
  cancelCallGarson(tableID: string, cafe_slug?: string) {
    return this.axios.post(
      `${this.slugRoute(cafe_slug)}/waiter_pager/${tableID}/cancel`,
    );
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
