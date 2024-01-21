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
  getCatalogs(): Promise<Catalog[]> {
    return this.axios.get(`/api/catalogs`).then(({ data }) => data);
  }
  getCatalog(id: string): Promise<Catalog> {
    return this.axios.get(`/api/catalogs/${id}`).then(({ data }) => data);
  }
}
