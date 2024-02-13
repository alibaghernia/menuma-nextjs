import React, { Fragment } from 'react';
import { RegisterFormComponent } from '@/components/pages/register_form';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Footer } from '@/components/core/footer/footer';
import { Logo } from '@/components/common/logo';
import Head from 'next/head';

function RegisterForm() {
  return (
    <>
      <Head>
        <title>درخواست فرم</title>
      </Head>
      <FlexBox direction="column" className="min-h-screen" justify="between">
        <FlexItem>
          <FlexBox direction="column" className="pt-[2.5rem] px-[2rem]">
            <FlexItem className="mx-auto">
              <Logo />
            </FlexItem>
            <FlexItem className="mt-[3rem]">
              <RegisterFormComponent />
            </FlexItem>
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <Footer />
        </FlexItem>
      </FlexBox>
    </>
  );
}

export default RegisterForm;
