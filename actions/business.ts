import { BusinessService } from '@/services/business/business.service';
import { cache } from 'react';

export const getBusiness = cache((slug: string) => {
  const businessService = BusinessService.init(slug);
  return businessService.get().then((data) => data.data);
});
