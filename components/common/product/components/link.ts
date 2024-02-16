'use server';

import { getSlug } from '@/utils/serverSideUtils';

export const getLink = (_slug: string, uuid: string) => {
  const slug = getSlug(_slug);
  return `/${[slug, 'menu', 'product', uuid].filter(Boolean).join('/')}`;
};
