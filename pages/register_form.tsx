import Head from "next/head"
import Link from "next/link"
import { Fragment, useContext, useEffect, useState } from "react"
import { axios, serverBaseUrl } from '@/utils/axios'

function TanksForRegister() {
    return (
        <>
            <Head>
                <title>{'منوما'}</title>
            </Head>
            <section className="bg-gray-50 ddd:bg-gray-900  h-full">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="mx-auto mb-7 text-[2rem] text-gray-800">
                        <Link href={{ pathname: '/' }}>
                            منوما
                        </Link>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow ddd:border md:mt-0 sm:max-w-md xl:p-0 ddd:bg-gray-800 ddd:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-base font-bold leading-tight tracking-tight text-gray-900 xmd:text-xl ddd:text-white
                            text-center">
                                درخواست شما ثبت شد
                            </h1>
                            <p className="text-xs text-gray-500">
                            کارشناسان ما زودی با شما تماس خواهند گرفت
                            </p>
                            <Link href={{ pathname: '/' }}>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#035dcf] hover:bg-[#1858ac] 
                                 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium 
                                 rounded-xl text-sm px-5 py-2.5 text-center ddd:bg-primary-600 ddd:hover:bg-primary-700
                                  ddd:focus:ring-primary-800
                                  mt-3">
                                    بازگشت به صفحه اصلی
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
function RegisterForm() {

    useEffect(() => {
    }, [])

    const [inputName, setInputName] = useState('');
    const [inputMobile, setInputMobile] = useState('');
    const [formSubmited, setFormSubmited] = useState(false);

    function handleNameChange(event: any) {
        const value = event.target.value;
        setInputName(value);

    }
    function handleMobileChange(event: any) {
        const value = event.target.value;
        setInputMobile(value);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();


        const res = await axios.post('/menu-request', {
            name: inputName,
            mobile: inputMobile,
        })

        setFormSubmited(true)

    }
    if (formSubmited) {
        return TanksForRegister()

    }
    return (
        <>
            <Head>
                <title>{'منوما'}</title>
            </Head>
            <section className="bg-gray-50 ddd:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="mx-auto mb-7 text-[2rem] text-gray-800">
                        <Link href={{ pathname: '/' }}>
                            منوما
                        </Link>
                    </div>
                    <div className="w-full bg-white rounded-lg shadow ddd:border md:mt-0 sm:max-w-md xl:p-0 ddd:bg-gray-800 ddd:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ddd:text-white">
                                فرم درخواست منو
                            </h1>
                            <p className="text-xs text-gray-500">
                                پس از ثبت درخواست مشاوران ما در اسرع وقت با شما تماس خواهند گرفت.
                            </p>

                            <form onSubmit={handleSubmit}
                                className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ddd:text-white">
                                        نام و نام خانوادگی شما
                                    </label>
                                    <input type="text" name="name" id="name"
                                        onChange={handleNameChange}
                                        className="bg-gray-50 border border-gray-300
                                     text-gray-900 sm:text-sm rounded-lg focus:ring-red-600
                                      focus:border-red-600 block w-full p-2.5 
                                      ddd:bg-gray-700 ddd:border-gray-600
                                      ddd:placeholder-gray-400 ddd:text-white
                                      ddd:focus:ring-blue-500 ddd:focus:border-blue-500"
                                        placeholder="" required />
                                </div>
                                <div>
                                    <label htmlFor="mobile"
                                        className="block mb-2 text-sm font-medium text-gray-900 ddd:text-white">
                                        شماره تماس
                                    </label>
                                    <input type="text" name="mobile" id="mobile" placeholder=""
                                        onChange={handleMobileChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                                      rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                                       ddd:bg-gray-700 ddd:border-gray-600 ddd:placeholder-gray-400 ddd:text-white
                                        ddd:focus:ring-blue-500 ddd:focus:border-blue-500
                                        text-left" required />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-[#035dcf] hover:bg-[#1858ac] 
                                 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium 
                                 rounded-lg text-sm px-5 py-2.5 text-center ddd:bg-primary-600 ddd:hover:bg-primary-700
                                  ddd:focus:ring-primary-800">
                                    ثبت درخواست
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

RegisterForm.provider = Fragment

export default RegisterForm
