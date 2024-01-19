import Image from 'next/image';
import React from 'react';
import { createPortal } from 'react-dom';
import coffeeLoadingGIF from '@/assets/images/coffee_animation.gif';

function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[10000] ">
      <Image
        priority
        width={coffeeLoadingGIF.width}
        height={coffeeLoadingGIF.height}
        alt="Loading"
        src={coffeeLoadingGIF.src}
        className="mx-auto absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      />
    </div>
  );
}

export default Loading;
