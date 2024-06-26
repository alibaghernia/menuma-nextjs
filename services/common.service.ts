import { AxiosInstance } from 'axios';

export class CommonService {
  static init(axios: AxiosInstance) {
    return new CommonService(axios);
  }

  constructor(private axios: AxiosInstance) {}
}
