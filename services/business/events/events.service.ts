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
    const { data: events } = await this.businessService.axios.get<EventType[]>(
      `${this.businessService.backendURL}/api/events?limit=5&ispinned=1`,
    );
    // return this.businessService.axios.post('/customer-club/register', args);
    return new Promise((resolve, rej) => {
      const event = events.find((event) => event.id == id);
      if (event) resolve(event);
      else rej(404);
    });
  }
}
