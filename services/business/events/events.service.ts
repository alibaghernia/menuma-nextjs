import { IProfile } from '@/pages/[slug]/types';
import axiosPkg, { AxiosInstance } from 'axios';
import NError from 'next/error';
import { BusinessService } from '../business.service';
import moment from 'jalali-moment';

export class EventsService {
  static init(businessService: BusinessService) {
    return new EventsService(businessService);
  }

  constructor(private businessService: BusinessService) {}

  async getEvent(id: string | number): Promise<EventType> {
    const events = await this.businessService.getEvents();
    return new Promise((resolve, rej) => {
      const event = events.find((event) => event.id == id);
      if (event) resolve(event);
      else rej(404);
    });
  }
}
