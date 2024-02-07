import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { CustomerClubService } from './customer_club/customer_club.service';
import { EventsService } from './events/events.service';
import { ISpecialDiscountProps } from '@/components/common/special_discount/types';
import {
  Business,
  CategoryEntity,
  ProductEntity,
  TableEntity,
} from './business';
import { ProductService } from '../product/product.service';

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
      baseURL: `${this.backendURL}/business${slug ? `/${slug}` : ''}`,
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
  get productService() {
    return ProductService.init(this.slug!);
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
  getAll(filters: ISearchBusiness = {}) {
    return this.axios
      .get<AxiosResponseType<{ businesses: Business[]; total: number }>>('/', {
        params: filters,
      })
      .then(({ data }) => data);
  }
  get(slug?: string) {
    return this.axios
      .get<AxiosResponseType<Business>>(this.slugRoute(slug))
      .then(({ data }) => data);
  }
  getMenu(slug?: string) {
    return this.axios
      .get<
        AxiosResponseType<(CategoryEntity & { products: ProductEntity[] })[]>
      >(`${this.slugRoute(slug)}/menu`)
      .then(({ data }) => data);
  }
  getDailyOffers(slug?: string) {
    return Promise.resolve([]);
    return this.axios
      .get<APIProduct[]>(`${this.slugRoute(slug)}/menu/day-offers`)
      .then(({ data }) => data);
  }
  getDiscounts(slug?: string): Promise<ConditionalDiscount[]> {
    return this.axios
      .get<ConditionalDiscount[]>(`${this.slugRoute(slug)}/discounts`)
      .then(({ data }) => data);
  }
  getEvents(args?: IGetEvents, slug?: string): Promise<EventType[]> {
    return this.axios
      .get<EventType[]>(`${this.slugRoute(slug)}/events`, { params: args })
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
  pager(slug?: string) {
    return {
      requestPager: (table_uuid: string) => {
        return this.axios
          .post<AxiosResponseType<{ request_uuid: string }>>(
            `${this.slugRoute(slug)}/pager-request`,
            {
              table_uuid,
            },
          )
          .then(({ data }) => data);
      },
      cancelRequestPager: (request_uuid: string) => {
        return this.axios.delete(
          `${this.slugRoute(slug)}/pager-request/${request_uuid}`,
        );
      },
      getTable: (tableCode: string) => {
        return this.axios
          .get<AxiosResponseType<TableEntity>>(
            `${this.slugRoute(slug)}/get-table/${tableCode}`,
          )
          .then(({ data }) => data);
      },
    };
  }
}
