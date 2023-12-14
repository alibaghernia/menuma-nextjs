import { CommonService } from "@/services/common.service";
import { REDUCER_KEYS } from "./constants";
import { IProviderState } from "./types";
import { type ICartItem } from "./types";
import { axios } from "@/utils/axios";

export default function functions(
  state: IProviderState,
  dispatch: (action: any) => void
) {
  const commonService = CommonService.init(axios);

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
        return commonService.callGarson(state.profile.slug, tableID);
      },
      cancelCallGarson: (tableID: string) => {
        return commonService.cancelCallGarson(state.profile.slug, tableID);
      },
      geTable: (tableID: string) => {
        return commonService.getTable(state.profile.slug, tableID);
      },
    },
  };
}
