import { FlexBox } from '@/components/common/flex_box/flex_box'
import { FlexItem } from '@/components/common/flex_item/flex_item'
import { Section } from '@/components/common/section/section'
import moment from 'moment'
import React, { useMemo } from 'react'
import _ from 'lodash'

export const WorkingHours = ({ data }: { data: any[] }) => {

    const renderWorkingHours = useMemo(() => {
        const todayName = moment().format("dddd").toLocaleLowerCase()
        const today = _.groupBy(data, item => item.weekday)
        return today[todayName]?.map((wh, key) => {
            const time1 = moment(wh.from, "HH:mm:ss")
            const time2 = moment(wh.to, "HH:mm:ss")
            return (
                <FlexItem key={key}>
                    <div className="text-center text-typography">
                        <FlexBox gap={2}>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={2}>
                                    <FlexItem>
                                        {key == 0 ? 'صبح' : 'بعد از ظهر'}
                                    </FlexItem>
                                    <FlexItem className='bg-white/[.5] px-4 py-1 rounded-full'>
                                        {time1.format('HH:mm')}
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                            <FlexItem>
                                <FlexBox alignItems='center' gap={2}>
                                    <FlexItem>
                                        تا
                                    </FlexItem>
                                    <FlexItem className='bg-white/[.5] px-4 py-1 rounded-full'>
                                        {time2.format('HH:mm')}
                                    </FlexItem>
                                </FlexBox>
                            </FlexItem>
                        </FlexBox>
                    </div>
                </FlexItem>
            )
        }) || (
                <div className="text-center text-typography bg-white/[.5] px-4 py-1 rounded-full">
                    امروز تعطیل است
                </div>
            )

    }, [data])

    return (

        <Section title='ساعات کاری'>
            <FlexBox gap={2} direction='column' alignItems='end' justify='center' className='px-[1.6rem] w-fit mx-auto'>
                {renderWorkingHours}
            </FlexBox>
        </Section>
    )
}

export default WorkingHours