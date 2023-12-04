import { FlexBox } from '@/components/common/flex_box/flex_box'
import { FlexItem } from '@/components/common/flex_item/flex_item'
import { Section } from '@/components/common/section/section'
import moment from 'moment'
import React, { FC, Fragment, useMemo } from 'react'
import _ from 'lodash'

export const WorkingHours: FC<any> = ({ data }) => {
    const renderWorkingHours = useMemo(() => {
        const todayName = moment().format("dddd").toLocaleLowerCase()
        const today = _.groupBy(data, item => item.weekday)
        return today[todayName]?.map((wh, key) => {
            const time1 = moment(wh.from, "HH:mm:ss").zone(-210)
            const time2 = moment(wh.to, "HH:mm:ss").zone(-210)
            return (
                <tr key={key} className='py-2'>
                    <td className='text-center px-2 pb-2'>
                        {time1.hour() < 12 ? 'صبح' : 'عصر'}
                    </td>
                    <td className='pb-2'>
                        <div className="bg-white/[.5] px-4 py-1 rounded-full">
                            {time1.format('HH:mm')}
                        </div>
                    </td>
                    <td className='px-2 pb-2'>
                        تا
                    </td>
                    <td className='pb-2'>
                        <div className="bg-white/[.5] px-4 py-1 rounded-full ">
                            {time2.format('HH:mm')}
                        </div>
                    </td>
                </tr >
            )
        }) || (
                <tr>
                    <td className="text-center text-typography  px-4 py-1 rounded-full border-[1px] border-black/[.2]">
                        امروز تعطیل است
                    </td>
                </tr>
            )

    }, [data])

    return data?.length ? (
        <Section title='ساعات کاری'>
            <table className='px-[1.6rem] w-fit mx-auto'>
                <tbody>
                    {renderWorkingHours}
                </tbody>
            </table>
        </Section>
    ) : <></>
}

export default WorkingHours
