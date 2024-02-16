import { Metadata } from 'next';
import React from 'react';

export const generateMetadata = async (
  _: any,
  parent: any,
): Promise<Metadata> => {
  const parentLay = await parent;
  return {
    title: [parentLay.title?.absolute, 'دورهمی ها'].reverse().join(' - '),
  };
};

const Layout = ({ children }: any) => {
  return children;
};

export default Layout;
