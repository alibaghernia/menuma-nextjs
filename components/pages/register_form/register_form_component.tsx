import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, Fragment } from 'react';
import { axios, serverBaseUrl } from '@/utils/axios';
import { Container } from '@/components/common/container/container';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Button } from '@/components/common/button';
import { Label } from '@/components/common/label';
import { TextField } from '@/components/common/text_field';

export const RegisterFormComponent = () => {
  const [input, setInput] = useState({
    name: '',
    mobile: '',
  });
  const [formSubmited, setFormSubmited] = useState(false);
  const handleSubmit = async () => {
    const res = await axios.post('/api/menu-request', {
      name: input.name,
      mobile: input.mobile,
    });
    setFormSubmited(true);
  };
  return (
    <Fragment>
      <div className="w-full bg-white rounded-lg shadow ddd:border md:mt-0 sm:max-w-md xl:p-0 ddd:bg-gray-800 ddd:border-gray-700 mx-auto">
        {formSubmited ? (
          <div>
            <FlexBox className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
              <FlexItem className="mx-auto mb-7 text-[2rem] text-gray-800">
                <Link href={{ pathname: '/' }}></Link>
              </FlexItem>
            </FlexBox>
            <FlexBox className="">
              <FlexItem className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-base font-bold leading-tight tracking-tight text-gray-900 xmd:text-xl ddd:text-white">
                  درخواست شما ثبت شد
                </h1>
                <p className="text-xs text-gray-500">
                  کارشناسان ما به زودی با شما تماس خواهند گرفت
                </p>
              </FlexItem>
            </FlexBox>
            <FlexBox direction="column">
              <FlexItem className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <Link href={{ pathname: '/' }}>
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center text-center"
                    onClick={() => {}}
                  >
                    بازگشت به صفحه اصلی
                  </Button>
                </Link>
              </FlexItem>
            </FlexBox>
          </div>
        ) : (
          <div>
            <FlexBox className="">
              <FlexItem className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ddd:text-white">
                  فرم درخواست منو
                </h1>
                <p className="text-xs text-gray-500">
                  پس از ثبت درخواست مشاوران ما در اسرع وقت با شما تماس خواهند
                  گرفت.
                </p>
              </FlexItem>
            </FlexBox>
            <FlexBox direction="column">
              <FlexItem className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div>
                  <Label for="name">نام و نام خانوادگی شما</Label>
                  <TextField
                    className="bg-gray-50 border border-gray-300
                                text-gray-900 sm:text-sm rounded-lg focus:ring-red-600
                                focus:border-red-600 block w-full p-2.5 
                                ddd:bg-gray-700 ddd:border-gray-600
                                ddd:placeholder-gray-400 ddd:text-white
                                ddd:focus:ring-blue-500 ddd:focus:border-blue-500"
                    type="text"
                    name="name"
                    onChange={(e: any) => {
                      setInput((input) => ({
                        ...input,
                        name: e.target.value,
                      }));
                    }}
                    required
                    placeholder=""
                  />
                </div>
                <div>
                  <Label for="mobile">شماره تماس</Label>
                  <TextField
                    className="bg-gray-50 border border-gray-300
                                text-gray-900 sm:text-sm rounded-lg focus:ring-red-600
                                focus:border-red-600 block w-full p-2.5 
                                ddd:bg-gray-700 ddd:border-gray-600
                                ddd:placeholder-gray-400 ddd:text-white
                                ddd:focus:ring-blue-500 ddd:focus:border-blue-500 flex-row text-left"
                    type="text"
                    name="name"
                    onChange={(e: any) => {
                      setInput((input) => ({
                        ...input,
                        mobile: e.target.value,
                      }));
                    }}
                  />
                </div>
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center text-center"
                  onClick={() => handleSubmit()}
                >
                  ثبت درخواست
                </Button>
              </FlexItem>
            </FlexBox>
          </div>
        )}
      </div>
    </Fragment>
  );
};
