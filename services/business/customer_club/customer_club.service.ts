import { BusinessService } from '../business.service';

export class CustomerClubService {
  static init(businessService: BusinessService) {
    return new CustomerClubService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  signUp(args: ISignUp) {
    return this.businessService.axios.post('/customer_club/customers', args);
  }
}
