import { CommonService } from "@/services/common.service";
import { REDUCER_KEYS } from "./constants";
import { IProviderState } from "./types";
import { type ICartItem } from "./types";
import { axios } from "@/utils/axios";
import { BusinessService } from "@/services/business/business.service";
import { useParams } from "next/navigation";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export default function functions(
  state: IProviderState,
  dispatch: (action: any) => void
) {
  const businessService = BusinessService.init().pager(state.profile?.uuid);

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
        return businessService.requestPager(tableID);
      },
      cancelCallGarson: (tableID: string) => {
        return businessService.cancelRequestPager(tableID);
      },
      geTable: (tableCode: string) => {
        return businessService.getTable(tableCode);
      },
    },
  };
}
