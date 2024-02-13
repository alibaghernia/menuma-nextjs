import { BusinessService } from '../business.service';
import { EventEntity } from '@/services/main/main';
import { TableEntity } from './tables';

export class TablesService {
  static init(businessService: BusinessService) {
    return new TablesService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async get(uuid: string) {
    return this.businessService.axios
      .get<AxiosResponseType<TableEntity>>(`/tables/${uuid}`)
      .then(({ data }) => data);
  }
}
