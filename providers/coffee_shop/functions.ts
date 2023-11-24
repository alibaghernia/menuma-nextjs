import { REDUCER_KEYS } from "./constants";
import { IProviderState } from "./types";
import { type ICartItem } from "./types";

export default function functions(
  state: IProviderState,
  dispatch: (action: any) => void
) {
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
  };
}
