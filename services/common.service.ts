import { AxiosInstance } from "axios";

export class CommonService {
  static init(axios: AxiosInstance) {
    return new CommonService(axios);
  }

  constructor(private axios: AxiosInstance) {}

  callGarson(cafe_slug: string, tableID: string) {
    return this.axios.post(
      `/api/cafe-restaurants/${cafe_slug}/waiter_pager/${tableID}/call`
    );
  }
  cancelCallGarson(cafe_slug: string, tableID: string) {
    return this.axios.post(
      `/api/cafe-restaurants/${cafe_slug}/waiter_pager/${tableID}/cancel`
    );
  }
}
