import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { BusinessService } from '../business.service';

export class CustomerClubService {
  static init(businessService: BusinessService) {
    return new CustomerClubService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  signUp(args: ISignUp) {
    return this.businessService.axios.post('/customer-club/register', args);
  }
}
