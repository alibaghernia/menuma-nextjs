'use client';
import React, { useContext, useMemo, useState } from 'react';
import { INavBar } from './types';
import { MenuIcon } from '@/icons/menu';
import classNames from 'classnames';
import { ArrowBackIcon } from '@/icons/arrow-back';
import { NoteIcon } from '@/icons/note';
import { LinedCloseIcon } from '@/icons/lined_close';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '@/tailwind.config';
import { HomeIcon } from '@/icons/home';
import { MenuCircleIcon } from '@/icons/menu-circle';
import { ProviderContext } from '@/providers/main/provider';
import { CoffeeShopProviderContext } from '@/providers/coffee_shop/provider';
import { useSlug } from '@/providers/main/hooks';
import { FlexBox } from '@/components/common/flex_box/flex_box';
import { FlexItem } from '@/components/common/flex_item/flex_item';
import { Container } from '@/components/common/container/container';
import dynamic from 'next/dynamic';
import { CallGarson } from '@/components/common/call_garson/call_garson';
import { useCustomRouter, useLoadings, useTailwindColor } from '@/utils/hooks';
import Link from '@/components/common/link/link';
import { PeopleIcon } from '@/icons/people';
import { DiscountIcon } from '@/icons/discount';
import { AwardOutlineIcon } from '@/icons/award-outline';
import Cart from '@/components/common/cart/cart';
const Navbar: INavBar = ({ background = true, callPager = true, ...props }) => {
  const router = useCustomRouter();
  const slug = useSlug(false);
  const [addL, removeL] = useLoadings();
  const {
    state: coffeShopState,
    handleCallGarson,
    cancelGarsonCallButton,
  } = useContext(CoffeeShopProviderContext);
  const { state } = useContext(ProviderContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const typographyColor = useTailwindColor('typography');

  const resolvedTailwindConfig = resolveConfig(tailwindConfig);

  const menuItems = useMemo(() => {
    const menu = [
      {
        title: 'پروفایل',
        icon: (
          <HomeIcon
            color={resolvedTailwindConfig.theme?.colors?.[
              'typography'
            ].toString()}
          />
        ),
        url: `/${slug}`,
      },
    ];

    if (coffeShopState.profile.has_menu) {
      menu.push({
        title: 'منو',
        icon: (
          <MenuCircleIcon
            color={resolvedTailwindConfig.theme?.colors?.[
              'typography'
            ].toString()}
          />
        ),
        url: `/${[slug, 'menu'].filter(Boolean).join('/')}`,
      });
    }
    if (coffeShopState.profile.has_discount) {
      menu.push({
        title: 'تخفیف های ویژه',
        icon: <DiscountIcon color={typographyColor} />,
        url: `/${[slug, 'discounts'].filter(Boolean).join('/')}`,
      });
    }
    if (coffeShopState.profile.has_event) {
      menu.push({
        title: 'دورهمی ها',
        icon: <PeopleIcon color={typographyColor} />,
        url: `/${[slug, 'events'].filter(Boolean).join('/')}`,
      });
    }
    if (coffeShopState.profile.customer_club) {
      menu.push({
        title: 'باشگاه مشتریان',
        icon: <AwardOutlineIcon color={typographyColor} />,
        url: `/${[slug, 'customer_club/register'].filter(Boolean).join('/')}`,
      });
    }

    return menu;
  }, [resolvedTailwindConfig, slug]);

  const renderMenuItems = useMemo(() => {
    return menuItems.map((menuItem, key) => (
      <FlexBox
        gap={2}
        alignItems="center"
        className="px-[1.5rem] py-[.8rem] border-black transition-[border] duration-[.1s] hover:border-r-[5px] border-b border-b-black/[.1] last:border-b-0 cursor-pointer"
        key={key}
        onClick={() => {
          if (menuItem.url) {
            setOverlay(false);
            setMenuOpen(false);
            router.push(menuItem.url);
          }
        }}
      >
        <FlexItem>{menuItem.icon}</FlexItem>
        <FlexItem className="text-[1rem]">{menuItem.title}</FlexItem>
      </FlexBox>
    ));
  }, [menuItems, router]);

  function handleBack() {
    if (props.backUrl) {
      router.replace(props.backUrl);
    } else {
      router.back();
    }
  }

  return (
    <Container
      id="navbar"
      position={
        typeof props.fixed == 'undefined'
          ? 'fixed'
          : props.fixed
            ? 'fixed'
            : 'sticky'
      }
      className={classNames('z-50', { 'top-0 w-full': !props.fixed })}
    >
      <FlexBox
        alignItems="center"
        justify="between"
        className={classNames(
          'relative px-[1.6rem] z-20 left-0 right-0 py-[1rem]',
          { 'bg-background': background },
        )}
      >
        <FlexItem>
          <FlexBox alignItems="center" gap=".5rem">
            <FlexItem
              className={classNames('cursor-pointer', {
                'py-[.2rem] px-[.4rem] bg-typography/[.3] rounded-[.5rem]':
                  props.menuButtonOverlay,
              })}
              onClick={() => {
                setMenuOpen(!menuOpen);
                setOverlay(!overlay);
              }}
            >
              <MenuIcon
                width={32}
                height={32}
                color={props.dark ? 'white' : '#434343'}
              />
            </FlexItem>
            {props.title && (
              <FlexItem
                className={classNames(
                  {
                    'text-typography': !props.dark,
                    'text-white': props.dark,
                  },
                  'text-[1.3rem] whitespace-nowrap',
                )}
              >
                {props.title}
              </FlexItem>
            )}
          </FlexBox>
        </FlexItem>
        <FlexItem>
          <FlexBox alignItems="center" gap=".5rem">
            {callPager && coffeShopState.profile.pager && (
              <FlexItem>
                <CallGarson
                  onClick={handleCallGarson}
                  isCancel={cancelGarsonCallButton}
                  size="small"
                />
              </FlexItem>
            )}
            {props.note && coffeShopState.profile.pager && (
              <FlexItem>
                <div
                  className="cursor-pointer relative"
                  onClick={() => {
                    setCartOpen(true);
                    setOverlay(true);
                  }}
                >
                  {Boolean(state.cart.length) && (
                    <div className="absolute min-w-[1rem] text-center min-h-[1rem] p-[.1rem] bg-red-800 text-white rounded-[1rem] top-[-.3rem] left-0 text-[.8rem] font-semibold">
                      {state.cart.length}
                    </div>
                  )}
                  <NoteIcon
                    width={32}
                    height={33}
                    color={props.dark ? 'white' : '#434343'}
                  />
                </div>
              </FlexItem>
            )}
            {props.back && (
              <FlexItem>
                <div className="cursor-pointer" onClick={handleBack}>
                  <ArrowBackIcon
                    width={32}
                    height={33}
                    color={props.dark ? 'white' : '#434343'}
                  />
                </div>
              </FlexItem>
            )}
          </FlexBox>
        </FlexItem>
      </FlexBox>
      <Container
        position="fixed"
        className={classNames('inset-0 z-50 transition duration-[.2s]', {
          'pointer-events-none': !overlay,
          'bg-black/[.3] pointer-events-auto': overlay,
        })}
        onClick={() => {
          setOverlay(false);
          setMenuOpen(false);
          setCartOpen(false);
        }}
      />
      <Container
        position="fixed"
        className={classNames(
          'transition-all top-0 bottom-0 duration-[.3s] z-50 max-w-xs w-full',
          {
            'right-0': menuOpen,
            'right-[-100%]': !menuOpen,
          },
        )}
      >
        <FlexBox
          direction="column"
          justify="between"
          className={classNames(
            'max-w-xs w-full h-full bg-white rounded-bl-[2rem] rounded-tl-[2rem]',
          )}
        >
          <FlexItem>
            <FlexBox direction="column">
              <FlexItem>
                <FlexBox
                  alignItems="center"
                  justify="between"
                  className="mt-[2rem] px-[1.5rem]"
                >
                  <FlexItem className="text-typography text-[1.5rem]">
                    {coffeShopState.profile?.name}
                  </FlexItem>
                  <FlexItem
                    className="cursor-pointer"
                    onClick={() => {
                      setOverlay(false);
                      setMenuOpen(!menuOpen);
                    }}
                  >
                    <LinedCloseIcon
                      width={32}
                      height={32}
                      color={resolvedTailwindConfig.theme?.colors?.[
                        'typography'
                      ].toString()}
                    />
                  </FlexItem>
                </FlexBox>
              </FlexItem>
              <FlexItem className="mt-[2rem]">
                <FlexBox direction="column">{renderMenuItems}</FlexBox>
              </FlexItem>
            </FlexBox>
          </FlexItem>
          <FlexItem className="text-gray-300 font-bold w-full text-center py-3">
            <Link href="https://menuma.online">
              <span className="hover:underline">
                قدرت گرفته از <span className="text-blue-400">منوما</span>
              </span>
            </Link>
          </FlexItem>
        </FlexBox>
      </Container>
      <Cart
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
          setOverlay(false);
        }}
      />
    </Container>
  );
};

export default Navbar;
