
// import React, { Fragment } from 'react'
// import { DatePicker } from 'jalali-react-datepicker';
// import { DatePicker, ConfigProvider } from 'antd';

// import { DatePicker, JalaliLocaleListener } from 'antd-jalali'

// import fa_IR from "antd/lib/locale/fa_IR";
// import { ConfigProvider } from 'antd/es';


// import { DatePicker, ConfigProvider } from "antd";
import { DatePicker as DatePickerJalali, Calendar, JalaliLocaleListener } from "antd-jalali";
// import fa_IR from "antd/lib/locale/fa_IR";
// import en_US from "antd/lib/locale/en_US";
// import "antd/dist/antd.css";
// import Provider from '@/providers/main/provider';
// import classNames from 'classnames';
// import { Badge } from '../../../../components/common/badge/badge';
// import cafeeshopBannelPlaceholder from '@/assets/images/coffeeshop-banner-placeholder.jpg';
import { Navbar } from '@/components/core/navbar/navbar'
import React, {
    //  useCallback, useContext, useEffect,
    useMemo,
    //   useRef,
    useState, Fragment
} from 'react'
// import CoffeShopProvider, { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider'
import Head from "next/head";
// import { useSlug } from "@/providers/main/hooks";


function RegisterForm() {
    const textInputClasses = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ddd:bg-gray-600 ddd:border-gray-500 ddd:placeholder-gray-400 ddd:text-white'
    // const { state } = useContext(CoffeeShopProviderContext)
    const [t, setT] = useState('sss')
    // console.log(state);
    // return null;

    const slug = 'useSlug(false)'

    const navbar = useMemo(() => (
        <Navbar title={'state?.profile?.name'}  />
    ), [t])
    return (
        <>
            <Head>
                <title>
                    منوما
                </title>
            </Head>
            <div className='bg-secondary min-h-screen'>
                {navbar}
                <div className="container p-2 w-full mx-auto">

                    <div className="mx-auto w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ddd:bg-gray-800 ddd:border-gray-700 mt-2">
                        <div className="mb-6">
                            <h5 className="text-xl font-medium text-gray-900 ddd:text-white text-center">
                                عضویت در باشگاه مشتریان
                            </h5>
                            <p className='text-xs text-gray-500 text-center mt-2'>
                                از تخفیف ها زودتر باخبر شوید و در قرعه کشی ها شرکت کنید
                            </p>
                        </div>
                        <form className="space-y-6 " action="#">

                            <div>
                                <label htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 ddd:text-white">
                                    نام
                                </label>
                                <input type="text" name="name" id="name"
                                    className={textInputClasses} placeholder="نام خود را وارد کنید" required />
                            </div>
                            <div>
                                <label htmlFor="family"
                                    className="block mb-2 text-sm font-medium text-gray-900 ddd:text-white">
                                    نام خانوادگی
                                </label>
                                <input type="text" name="family" id="family"
                                    className={textInputClasses} placeholder="نام خانوادگی خود را وارد کنید" required />
                            </div>
                            <div className="">
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 ddd:text-white">

                                    تاریخ تولد
                                </label>
                                <DatePickerJalali />

                            </div>
                            <div className="">
                                <label className='block mb-2 text-sm font-medium text-gray-900 ddd:text-white font-semiboldz'>
                                    جنسیت
                                </label>
                                <div className="flex items-center mb-4">
                                    <input id="man" type="radio" name="gender" value="man"
                                        className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 ddd:focus:ring-blue-600 ddd:focus:bg-blue-600 ddd:bg-gray-700 ddd:border-gray-600
                            " />
                                    <label htmlFor="man" className="block ms-2  text-sm font-medium text-gray-900 ddd:text-gray-300">
                                        مرد
                                    </label>
                                </div>

                                <div className="flex items-center mb-4">
                                    <input id="woman" type="radio" name="gender" value="woman" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 ddd:focus:ring-blue-600 ddd:focus:bg-blue-600 ddd:bg-gray-700 ddd:border-gray-600" />
                                    <label htmlFor="woman" className="block ms-2 text-sm font-medium text-gray-900 ddd:text-gray-300 ">
                                        زن
                                    </label>
                                </div>
                            </div>

                            <button type="submit"
                                className="w-full text-white bg-[#eeb33f] hover:bg-[#eec168] focus:ring-4 focus:outline-none focus:ring-[#eeb43f82] font-medium rounded-lg text-sm px-5 py-2.5 text-center ddd:bg-blue-600 ddd:hover:bg-blue-700 ddd:focus:ring-blue-800">
                                ثبت نام
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

RegisterForm.provider = Fragment

export default RegisterForm