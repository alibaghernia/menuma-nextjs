import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useSlug } from '@/providers/main/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { Button, Form, Input, Radio } from 'antd/lib';
import classNames from 'classnames';
import Head from 'next/head';
import React, { useContext } from 'react';
import { DatePicker } from 'zaman';

function CustomerClubRegisterPage() {
  const slug = useSlug(false);
  const [form] = Form.useForm();
  const { state } = useContext(CoffeeShopProviderContext);

  const onFinish = (values: any) => {
    console.log({
      values,
    });
  };

  return (
    <>
      <Head>
        <title>
          {`${
            state.profile.name + ' - باشگاه مشتریان' + (slug ? ' - منوما' : '')
          }`}
        </title>
      </Head>
      <div className="min-h-screen w-full">
        <Navbar fixed={false} callPager={false} />
        <div className="px-10">
          <FlexBox
            className="max-w-lg mx-auto mt-2 gap-[1rem]"
            alignItems="stretch"
            direction="column"
          >
            <FlexItem
              className="text-typography text-center text-[1.2rem] font-bold"
              grow
            >
              ثبت نام در باشگاه مشتریان
            </FlexItem>
            <FlexItem>
              <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="نام"
                  name="fname"
                  rules={[
                    {
                      required: true,
                      message: 'نام اجباری است!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="نام خانوادگی"
                  name="lname"
                  rules={[
                    {
                      required: true,
                      message: 'نام خانوادگی اجباری است!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="تاریخ تولد"
                  name="birth_date"
                  rules={[
                    {
                      required: true,
                      message: 'تاریخ تولد اجباری است!',
                    },
                  ]}
                >
                  <div
                    className={classNames('zaman-input-wrapper', {
                      'is-invalid': !!form.getFieldError('birth_date').length,
                    })}
                  >
                    <DatePicker
                      round="x2"
                      accentColor="#6374ae"
                      onChange={(e) => {
                        form.setFieldValue('birth_date', e.value.toISOString());
                      }}
                    />
                  </div>
                </Form.Item>
                <Form.Item
                  label="جنسیت"
                  name="sex"
                  rules={[
                    {
                      required: true,
                      message: 'انتخاب جنسیت اجباری است!',
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="male">آقا</Radio>
                    <Radio value="female">خانم</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  label="شماره تماس"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: 'شماره تماس اجباری است!',
                    },
                    {
                      pattern: /^(09|989|00989|9)\d{9}$/,
                      message: 'شماره موبایل درست نیست!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Button block htmlType="submit" type="primary" className="mt-4">
                  ثبت نام
                </Button>
              </Form>
            </FlexItem>
          </FlexBox>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(CustomerClubRegisterPage);
