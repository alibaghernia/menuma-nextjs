import { REDUCER_KEYS } from "./constants";
import { IProviderState } from "./types";

export default function reducer(state: IProviderState, action: any) {
  switch (action.type) {
    case REDUCER_KEYS.SET_PROFILE: {
      state.profile = action.data;
      return state;
    }
    case REDUCER_KEYS.profile.UPDATE: {
      const { key, value } = action.data
      state.profile[key] = value
      return state;
    }
    default: {
      return state;
    }
  }
}
