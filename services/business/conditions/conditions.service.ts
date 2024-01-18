import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { BusinessService } from '../business.service';

export class ConditionsService {
  static init(businessService: BusinessService) {
    return new ConditionsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getCondition(id: string | number): Promise<ConditionType> {
    const { data: conditions } = await this.businessService.axios.get<
      ConditionType[]
    >(`${this.businessService.backendURL}/api/conditions?limit=5&ispinned=1`);
    return new Promise((resolve, rej) => {
      const condition = conditions.find((condition) => condition.id == id);
      if (condition) resolve(condition);
      else rej(404);
    });
  }
}
