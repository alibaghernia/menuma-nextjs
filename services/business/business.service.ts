import axiosPkg, { AxiosInstance } from "axios";

export class BusinessService {
  static init() {
    return new BusinessService();
  }

  private axios: AxiosInstance;

  constructor() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error("Check Backend URL!");
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}/business`,
    });
  }

  get(slug: string) {
    return this.axios
      .get<IResponseType<BusinessType>>(`/${slug}`)
      .then(({ data }) => data);
  }
}
