import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { BusinessService } from '../business.service';
import moment from 'jalali-moment';
import { EventEntity, IGetEvents } from '@/services/main/main';

export class EventsService {
  static init(businessService: BusinessService) {
    return new EventsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  getItems(args?: IGetEvents) {
    return this.businessService.axios
      .get<AxiosResponseType<{ items: EventEntity[]; total: number }>>(
        `/events`,
        { params: args },
      )
      .then(({ data }) => data);
  }
  async get(uuid: string) {
    return this.businessService.axios
      .get<AxiosResponseType<EventEntity>>(`/events/${uuid}`)
      .then(({ data }) => data);
  }
}
