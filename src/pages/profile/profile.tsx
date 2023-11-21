import ProfileHeader from '../../components/pages/profile/header'
import React, { useEffect } from 'react'
import cofeeImage from '../../assets/images/cofee.jpg';
import { useImageSize } from 'react-image-size';

export default function ProfilePage() {
    const [dimensions, { loading, error }] = useImageSize(cofeeImage);
    console.log({
        dimensions
    });
    return (
        <div className="max-w-sm">
            <div className="header">
                <ProfileHeader imageHref={cofeeImage} />
            </div>
        </div>
    )
}
