'use client';
import { Button } from '@/components/common/button';
import ConfirmModal from '@/components/common/confirm_modal/confirm_modal';
import { IConfirmModalProps } from '@/components/common/confirm_modal/types';
import { Location } from '@/icons/location';
import { LOADING_KEYS } from '@/providers/general/contants';
import { useCustomRouter, useLoadings } from '@/utils/hooks';
import React, { useState } from 'react';

const FindNearestBusinesses = () => {
  const [addL, removeL] = useLoadings();
  const router = useCustomRouter();
  const [confirmModal, setConfirmModal] = useState<IConfirmModalProps>();
  const findNearestBusinessHandler = () => {
    function showErrorModal(title: string, error: string) {
      setConfirmModal({
        open: true,
        title,
        dangerConfirm: false,
        primaryConfirm: true,
        dismissButton: false,
        content: (
          <div className="text-[1rem] text-typography text-center">{error}</div>
        ),
        onClose() {
          setConfirmModal(undefined);
        },
        onConfirm() {
          setConfirmModal(undefined);
        },
      });
    }
    if (navigator.geolocation) {
      addL('get-location');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          removeL('get-location');
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          addL(LOADING_KEYS.pageLoading);
          router.push(`/search?near=1&lat=${lat}&long=${long}`);
        },
        (error) => {
          removeL('get-location');
          console.log({
            error,
          });
          if (error.code == 1) {
            showErrorModal(
              'خطای دسترسی',
              'دسترسی به خواندن موقعیت مکانی داده نشده است.',
            );
          } else if (error.code == 2) {
            showErrorModal(
              'خطا',
              'امکان دریافت اطلاعات موقعیت مکانی از سرویس دهنده وجود ندارد.',
            );
          } else {
            showErrorModal(
              'خطا',
              'خطایی در دریافت اطلاعات موقعیت مکانی رخ داد.',
            );
          }
        },
      );
    }
  };
  return (
    <>
      <Button
        color="secondary"
        className="py-[.5rem] px-[.8rem] flex items-center"
        onClick={findNearestBusinessHandler}
      >
        <Location />
        پیدا کردن نزدیکترین کافه
      </Button>

      {confirmModal && <ConfirmModal {...confirmModal} />}
    </>
  );
};

export default FindNearestBusinesses;
