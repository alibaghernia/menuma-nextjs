import axiosPkg, { AxiosInstance } from 'axios';
import moment from 'moment';

export class MainService {
  static init() {
    return new MainService();
  }

  private axios: AxiosInstance;

  constructor() {
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_BASE_API;
    if (!backendURL) {
      throw new Error('Check Backend URL!');
    }
    this.axios = axiosPkg.create({
      baseURL: `${backendURL}`,
    });
  }

  getEvents(): Promise<EventType[]> {
    // return this.axios
    //   .get<IResponseType<GetCategoriesTypes>>(`/`, {
    //     params: {},
    //   })
    //   .then(({ data }) => data);
    return new Promise<EventType[]>((resolve, rej) => {
      resolve([
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
      ]);
    });
  }
}
