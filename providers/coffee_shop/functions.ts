import { CommonService } from '@/services/common.service';
import { REDUCER_KEYS } from './constants';
import { IProviderState } from './types';
import { type ICartItem } from './types';
import { axios } from '@/utils/axios';
import { BusinessService } from '@/services/business/business.service';

export default function functions(
  state: IProviderState,
  dispatch: (action: any) => void,
) {
  const businessService = BusinessService.init();
  const getApisBySlug = businessService.getApisBySlug(state.profile.slug);
  return {
    setProfile: (profile: any) => {
      dispatch({
        type: REDUCER_KEYS.SET_PROFILE,
        data: profile,
      });
    },
    profile: {
      update(key: string, value: any) {
        dispatch({
          type: REDUCER_KEYS.profile.UPDATE,
          data: {
            key,
            value,
          },
        });
      },
      get() {
        return state.profile;
      },
    },
    services: {
      callGarson: (tableID: string) => {
        return getApisBySlug.callGarson(tableID);
      },
      cancelCallGarson: (tableID: string) => {
        return getApisBySlug.cancelCallGarson(tableID);
      },
      geTable: (tableID: string) => {
        return getApisBySlug.getTable(tableID);
      },
    },
  };
}
