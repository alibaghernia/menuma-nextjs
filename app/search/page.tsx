'use client';
import { Logo } from '@/components/common/logo';
import { Fragment, useContext, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CoffeeShopPageProvider } from '@/providers/coffee_shop/page_provider';
import { SearchBusinessBox } from '@/components/common/search_business_box/search_business_box';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { useLoadings } from '@/utils/hooks';
import Link from '@/components/common/link/link';
import { Select } from 'antd/lib';
import { toPersianNumber } from '@/helpers/functions';
import AdvancedSearch from '@/components/common/advanced_search/advanced_search';
import { GeneralContext } from '@/providers/general/provider';
import { BusinessService } from '@/services/business/business.service';
import { useParams, useSearchParams } from 'next/navigation';

type SearchArgs = {
  is_pinned?: boolean;
  search_field?: string;
};

function Search() {
  const [addL, removeL] = useLoadings();
  const { loadings } = useContext(GeneralContext);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [advancedSearchArgs, setAdvancedSearchArgs] = useState({});
  const searchParams = useSearchParams();
  const isNear = !!searchParams.get('near');
  const [searchField, setSearchField] = useState('');
  const [radius, setRadius] = useState('2 کیلومتری');
  const [fetchedItems, setFetchedItems] = useState<
    {
      logo: string;
      title: string;
      slug: string;
      address: string;
      distance?: number;
    }[]
  >([]);
  const businessService = BusinessService.init();

  const handleFetchBusinesses = (args: SearchArgs = {}) => {
    if (!!!Object.keys(args).length) return;
    addL('fetch-businesses');
    businessService
      .getAll({
        search: args.search_field,
        pin: args.is_pinned,
      })
      .finally(() => {
        removeL('fetch-businesses');
      })
      .then((data) => {
        setAdvancedSearch(false);
        setFetchedItems(
          data.data.businesses.map((business) => ({
            logo: business.logo_url ? business.logo_url : noImage.src,
            title: business.name,
            slug: business.slug,
            address: business.address,
          })),
        );
      });
  };

  const fetchNearBusinesses = (distance: string) => {
    addL('fetch-businesses');
    businessService
      .getAll({
        distance: distance as string,
        location_lat: searchParams.get('lat')!,
        location_long: searchParams.get('long')!,
      })
      .finally(() => {
        removeL('fetch-businesses');
      })
      .then(({ data }) => {
        setFetchedItems(
          data.businesses.map((business) => ({
            title: business.name,
            address: business.address,
            slug: business.slug,
            distance: business.distance,
            logo: business.logo_url ? business.logo_url : noImage.src,
          })),
        );
      });
  };

  useEffect(() => {
    if (searchParams.get('search')) {
      handleFetchBusinesses({
        search_field: searchParams.get('search') as string,
      });
      setSearchField(searchParams.get('search') as string);
    }
    if (
      searchParams.get('near') &&
      searchParams.get('lat') &&
      searchParams.get('long') &&
      isNear
    ) {
      fetchNearBusinesses('2000');
    }
  }, [searchParams]);

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
            <div className="flex flex-col gap-[.25rem]">
              <div className="text-[.725rem] text-typography font-bold">
                {business.address && 'آدرس:'}
              </div>
              <div className="text-[.725rem] text-typography/[.8]">
                {business.address && business.address}
              </div>
            </div>

            {business.distance && (
              <div className="flex gap-[.25rem]">
                <div className="text-[.725rem] text-typography font-bold">
                  فاصله:
                </div>
                <div className="text-[.725rem] text-typography/[.8] whitespace-nowrap">
                  {getDistanceText(business.distance)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const handleSearchBusiness = (searchPhrase: string) => {
    handleFetchBusinesses({
      ...advancedSearchArgs,
      search_field: searchPhrase,
    });
  };

  const onChangeSelect = (value: string) => {
    fetchNearBusinesses(value);
    if (value == '500') {
      setRadius(`${toPersianNumber(Number(value))} متری`);
    } else {
      setRadius(`${toPersianNumber(Number(value) / 1000)} کیلومتری`);
    }
  };

  const onSearch = (value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <>
      <div className="mx-auto md:w-fit mt-[2.38rem] flex flex-col px-[2rem] min-h-screen">
        <div className="mx-auto">
          <Logo />
        </div>
        <div className="mt-[2.12rem]">
          {!isNear ? (
            <SearchBusinessBox
              onAdvancedSearchClick={() => setAdvancedSearch(true)}
              value={searchField}
              onChange={setSearchField}
              onSearch={handleSearchBusiness}
            />
          ) : (
            <Fragment>
              <div className="flex flex-col gap-[.875rem] items-center pb-4">
                <Select
                  style={{ width: '100%' }}
                  defaultValue="2000"
                  showSearch
                  placeholder="انتخاب محدوده"
                  optionFilterProp="children"
                  onChange={onChangeSelect}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={[
                    {
                      value: '500',
                      label: 'محدوده ۵۰۰ متر',
                    },
                    {
                      value: '1000',
                      label: 'محدوده ۱ کیلومتر',
                    },
                    {
                      value: '2000',
                      label: 'محدوده ۲ کیلومتر',
                    },
                  ]}
                />
              </div>

              <div className="text-center text-typography/[.8] w-full">
                در شعاع {radius} شما
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
            searchParams.get('search') && (
              <div className="center">موردی وجود ندارد</div>
            )
          )}
        </div>
      </div>

      <AdvancedSearch
        loading={!!loadings.includes('fetch-businesses')}
        onClose={() => setAdvancedSearch(false)}
        open={advancedSearch}
        float
        fields={[
          {
            name: 'is_pinned',
            title: 'منتخب',
            type: 'check',
            checkValue: '1',
          },
        ]}
        onSearch={(data) => {
          setAdvancedSearchArgs(data);
          handleFetchBusinesses({ ...data, search_field: searchField });
        }}
      />
    </>
  );
}

export default CoffeeShopPageProvider(Search);