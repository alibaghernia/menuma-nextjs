import { AxiosInstance } from 'axios';

export class CommonService {
  static init(axios: AxiosInstance) {
    return new CommonService(axios);
  }

  constructor(private axios: AxiosInstance) {}

  getTable(cafe_slug: string, tableID: string) {
    return this.axios.get<TableType>(
      `/api/cafe-restaurants/${cafe_slug}/tables/${tableID}`,
    );
  }
  callGarson(cafe_slug: string, tableID: string) {
    return this.axios.post(
      `/api/cafe-restaurants/${cafe_slug}/waiter_pager/${tableID}/call`,
    );
  }
  cancelCallGarson(cafe_slug: string, tableID: string) {
    return this.axios.post(
      `/api/cafe-restaurants/${cafe_slug}/waiter_pager/${tableID}/cancel`,
    );
  }
}
