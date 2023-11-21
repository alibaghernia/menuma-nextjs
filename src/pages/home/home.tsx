import ProfileHeader from '../../components/pages/profile/header'
import React, { useEffect } from 'react'
import cofeeImage from '../../assets/images/cofee.jpg';

export default function HomePage() {

    useEffect(() => {

        console.log({
            src: cofeeImage
        });
    }, [])

    return (
        <div className="max-w-sm">
            <div className="header">
                <ProfileHeader imageHref={"../../assets/images/cofee.jpg"} />
                <img src={cofeeImage} />
            </div>
        </div>
    )
}
