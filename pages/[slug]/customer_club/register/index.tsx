import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import Navbar from '@/components/core/navbar/navbar';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useSlug } from '@/providers/main/hooks';
import { withCafeeShopProfile } from '@/utils/serverSideUtils';
import { Button, Form, Input, Radio, theme } from 'antd/lib';
import classNames from 'classnames';
import Head from 'next/head';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import { DatePicker } from 'zaman';
import { createUseStyles } from 'react-jss';
import { useCustomRouter, useLoadings, useMessage } from '@/utils/hooks';
import moment from 'jalali-moment';
import Link from 'next/link';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import DatePicker from 'react-multi-date-picker';
import DateObject from 'react-date-object';

const registeredKey = 'register-customer-club';

function CustomerClubRegisterPage() {
  const slug = useSlug(false);
  const message = useMessage();
  const [addL, removeL] = useLoadings();
  const [form] = Form.useForm();
  const { state, businessService } = useContext(CoffeeShopProviderContext);
  const designToken = theme.useToken();
  const router = useCustomRouter();
  const [alreadyRegistred, setAlreadyRegistred] = useState(false);
  const [birthDate, setBirthDate] = useState<
    DateObject | DateObject[] | null
  >();

  useEffect(() => {
    if (window) {
      if (localStorage.getItem(registeredKey)) {
        setAlreadyRegistred(true);
      }
    }
  }, []);
  console.log({
    designToken,
  });
  const datePickerStype = createUseStyles(
    {
      input: {
        width: '100%',
        border: 'none',
        outline: 'none',
        backgroundColor: '#ffffff',
        padding: `${designToken.token.Input?.paddingBlock}px 11px`,
        fontSize: '0.875rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#d9d9d9',
        borderRadius: '6px',
      },
    },
    { name: 'date-picker' },
  )();
  const datePickerFormItem = createUseStyles({
    input: {
      '& .ant-form-item-control-input-content': {
        flex: 'unset !important',
      },
    },
  })();

  const onFinish = (values: any) => {
    addL('singup-customer-club');
    businessService.customerClubService
      .signUp(values)
      .finally(() => {
        removeL('singup-customer-club');
      })
      .then(() => {
        localStorage.setItem(registeredKey, '1');
        message.success('ضمن تشکر از شما، ثبت نام با موفقیت انجام شد.');
        router.replace(`/${slug}`);
      })
      .catch(() => {
        message.error('مشکلی در ثبت نام وجود دارد.');
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
        <Navbar
          fixed={false}
          callPager={false}
          back
          title={state.profile.name}
        />
        {alreadyRegistred ? (
          <FlexBox direction="column" justify="center" className="h-full px-6">
            <FlexItem className="text-typography font-semibold text-[1.2rem] text-center mt-[40vh]">
              کاربر گرامی ثبت نام شما در باشگاه مشتریان قبلا انجام شده است!
            </FlexItem>
            <FlexItem className="mt-[1rem]">
              <Link href={`/${slug}`}>
                <Button block type="primary">
                  بازگشت به پروفایل
                </Button>
              </Link>
            </FlexItem>
          </FlexBox>
        ) : (
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
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'نام اجباری است!',
                      },
                      {
                        max: 20,
                        message: 'طول نام نباید بیشتر از 20 کاراکتر باشد!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="نام خانوادگی"
                    name="family"
                    rules={[
                      {
                        required: true,
                        message: 'نام خانوادگی اجباری است!',
                      },
                      {
                        max: 20,
                        message:
                          'طول نام خانوادگی نباید بیشتر از 20 کاراکتر باشد!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="تاریخ تولد"
                    name="birth_date"
                    className={'w-full'}
                    getValueFromEvent={(date: DateObject) => {
                      return moment(date?.toDate().toISOString()).format(
                        'YYYY-MM-DD',
                      );
                    }}
                    valuePropName=""
                    initialValue={''}
                    rules={[
                      {
                        required: true,
                        message: 'تاریخ تولد اجباری است!',
                      },
                    ]}
                  >
                    <DatePicker
                      inputClass={classNames('ant-input', designToken.hashId)}
                      containerClassName="w-full"
                      className="rmdp-mobile w-full"
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      value={birthDate}
                      highlightToday={false}
                      onChange={(date: DateObject) => {
                        setBirthDate(date);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="جنسیت"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'انتخاب جنسیت اجباری است!',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="man">آقا</Radio>
                      <Radio value="woman">خانم</Radio>
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
                  <Button
                    block
                    htmlType="submit"
                    type="primary"
                    className="mt-4"
                  >
                    ثبت نام
                  </Button>
                </Form>
              </FlexItem>
            </FlexBox>
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps = withCafeeShopProfile();

export default CoffeeShopPageProvider(CustomerClubRegisterPage);
