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

  getEvent(id: string | number): Promise<EventType> {
    const events = [
      {
        id: 1,
        name: 'event 1',
        cafe_restaurant_id: 1,
        created_at: moment.now().toString(),
        updated_at: moment.now().toString(),
        date: moment().add('day', 10).toISOString(),
        from: '7:00',
        to: undefined,
        banner_path: '',
        capacity: 5,
        long_description:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز.',
        short_description:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز.',
      },
      {
        id: 2,
        name: 'event 1',
        cafe_restaurant_id: 1,
        created_at: moment.now().toString(),
        updated_at: moment.now().toString(),
        date: moment().add('day', 10).toISOString(),
        from: '8:00',
        to: '15:00',
        banner_path: '',
        long_description:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز.',
        short_description:
          'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز.',
      },
    ];
    // return this.businessService.axios.post('/customer-club/register', args);
    return new Promise((resolve, rej) => {
      const event = events.find((event) => event.id == id);
      resolve(event || events[0]);
    });
  }
}
