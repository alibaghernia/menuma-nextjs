import { Logo } from '@/components/common/logo';
import { Fragment, useContext, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { ProviderContext } from '@/providers/main/provider';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import { useRouter } from 'next/router';
import { axios, serverBaseUrl } from '@/utils/axios';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { useCustomRouter, useLoadings } from '@/utils/hooks';
import { LOADING_KEYS } from '@/providers/general/contants';
import Link from 'next/link';
import { SelectField } from '@/components/common/select_field/select_field';

function Search() {
  const [addL, removeL] = useLoadings();
  const { query: params } = useCustomRouter();
  const isNear = !!params.near;
  const [searchField, setSearchField] = useState('');
  const [fetchedItems, setFetchedItems] = useState<
    {
      logo: string;
      title: string;
      slug: string;
      address: string;
      distance?: number;
    }[]
  >([]);

  const handleFetchBusinesses = (searchPhrase: string) => {
    if (!searchPhrase) return;
    addL('fetch-businesses');
    axios
      .get(`/api/cafe-restaurants?all_fields=${searchPhrase}`)
      .finally(() => {
        removeL('fetch-businesses');
      })
      .then(({ data }) => {
        setFetchedItems(
          (data as any[]).map((business) => ({
            logo: business.logo_path
              ? `${serverBaseUrl}/storage/${business.logo_path}`
              : noImage.src,
            title: business.name,
            slug: business.slug,
            address: business.address,
          })),
        );
      });
  };

  const fetchNearBusinesses = (distance: string) => {
    addL('fetch-businesses');
    axios
      .get(
        `/api/cafe-restaurants?lat=${params.lat}&long=${params.long}&distance=${distance}`,
      )
      .finally(() => {
        removeL('fetch-businesses');
      })
      .then(({ data }) => {
        setFetchedItems(
          (data as any[]).map((business) => ({
            title: business.name,
            address: business.address,
            slug: business.slug,
            distance: business.distance,
            logo: business.logo_path
              ? `${serverBaseUrl}/storage/${business.logo_path}`
              : noImage.src,
          })),
        );
      });
  };

  useEffect(() => {
    if (params.search) {
      handleFetchBusinesses(params.search as string);
      setSearchField(params.search as string);
    }
    if (params.near && params.lat && params.long && isNear) {
      fetchNearBusinesses('2000');
    }
  }, [params]);

  function roundUpToNearestMultipleOf100(number: number) {
    return Math.ceil(number / 100) * 100;
  }

  const getDistanceText = (distance: number) => {
    const km = distance / 1000;
    if (km > 1) {
      return `کمتر از ${Math.floor(km) + 1} کیلومتر`;
    } else {
      return `کمتر از${roundUpToNearestMultipleOf100(distance)}متر`;
    }
  };

  const renderBusinesses = () => {
    return fetchedItems.map((business, idx) => (
      <div
        className="flex p-[1.13rem] gap-[.63rem] shadow-[0_0_10px_0_rgba(0,0,0,0.15)] rounded-[1rem] w-full md:w-full overflow-hidden"
        key={idx}
      >
        <Link
          href={`/${business.slug}`}
          className="relative w-[5.875rem] h-[5.875rem] shrink-0 rounded-full overflow-hidden border"
        >
          <Image fill src={business.logo} alt={business.title} />
        </Link>
        <div className="flex flex-col justify-between w-full">
          <Link
            href={`/${business.slug}`}
            className="text-typography text-[1rem]"
          >
            {business.title}
          </Link>
          <div className="flex gap-[1rem] items-end justify-between w-full">
            {business.address && (
              <div className="flex flex-col gap-[.25rem]">
                <div className="text-[.725rem] text-typography font-bold">
                  آدرس:
                </div>
                <div className="text-[.725rem] text-typography/[.8]">
                  {business.address}
                </div>
              </div>
            )}
            {business.distance && (
              <div className="flex gap-[.25rem]">
                <div className="text-[.725rem] text-typography font-bold">
                  فاصله:
                </div>
                <div className="text-[.725rem] text-typography/[.8] whitespace-nowrap">
                  {getDistanceText(256)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const handleSearchBusiness = (searchPhrase: string) => {
    handleFetchBusinesses(searchPhrase);
  };
  const onChangeSelect = (value: string) => {
    fetchNearBusinesses(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <div className="mx-auto md:w-fit mt-[2.38rem] flex flex-col px-[2rem]">
        <div className="mx-auto">
          <Logo />
        </div>
        <div className="mt-[2.12rem]">
          {!isNear ? (
            <SearchBusinessBox
              value={searchField}
              onChange={setSearchField}
              onSearch={handleSearchBusiness}
            />
          ) : (
            <Fragment>
              <div className="flex flex-col gap-[.875rem] items-center pb-4">
                <SelectField
                  showSearch
                  style={{ width: '100%' }}
                  optionFilterProp="children"
                  placeholder="انتخاب محدوده"
                  onChange={onChangeSelect}
                  onSearch={onSearch}
                  option={[
                    {
                      value: '500',
                      label: 'محدوده 500 متر',
                    },
                    {
                      value: '1000',
                      label: 'محدوده 1000 متر',
                    },
                    {
                      value: '2000',
                      label: 'محدوده 2000 متر',
                    },
                  ]}
                  name="search"
                  filterOption={filterOption}
                />
              </div>

              <div className="text-center text-typography/[.8] w-full">
                در شعاع 2 کیلومتری شما
              </div>
            </Fragment>
          )}
        </div>

        <div className="mt-[1.5rem]">
          {fetchedItems.length ? (
            <div className="flex flex-col gap-[.875rem] items-center">
              {renderBusinesses()}
            </div>
          ) : (
            params.search && <div className="center">موردی وجود ندارد</div>
          )}
        </div>
      </div>
    </>
  );
}

export default CoffeeShopPageProvider(Search);
