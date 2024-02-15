'use server';

import { cookies } from 'next/headers';

export const setIsNotMenuma = (is: boolean) => {
  cookies().set('is-not-menuma', is ? '0' : '1');
};

export const getIsNotMenuma = () => {
  const isNotMenuma = !!+cookies().get('is-not-menuma')?.value!;
  return isNotMenuma;
};
