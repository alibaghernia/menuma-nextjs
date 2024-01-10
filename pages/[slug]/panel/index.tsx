import { GetServerSideProps, GetServerSidePropsResult } from 'next';

import React from 'react';

export default function Panel() {
  return <div>Panel</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const panelUrl = process.env.NEXT_PUBLIC_PANEL_URL;
  if (!panelUrl) {
    console.log('Check panel url env');
    process.exit(1);
  }

  return {
    redirect: {
      destination: 'https://panel.menuma.online',
      permanent: true,
    },
    props: {},
  };
};
