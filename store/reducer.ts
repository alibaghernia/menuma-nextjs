import { REDUCER_KEYS } from "./constants";
import { IProviderState } from "./types";

export default function reducer(state: IProviderState, action: any) {
  switch (action.type) {
    case REDUCER_KEYS.cart.ADD_ITEM: {
      state.cart.push(action.data);
      return state;
    }
    case REDUCER_KEYS.cart.REMOVE_ITEM: {
      state.cart = state.cart.filter((item) => item.id != action.data);
      return state;
    }
    case REDUCER_KEYS.cart.UPDATE_ITEM: {
      const { itemId, key, value } = action.data;
      const itemIndex = state.cart.findIndex((item) => item.id == itemId);
      if (itemIndex) {
        const item = state.cart[itemIndex];
        //@ts-ignore
        item[key] = value
        state.cart[itemIndex] = item
      }
      return state;
    }
    case REDUCER_KEYS.cart.INCREASE_COUNT: {
      const  itemId  = action.data;
      const itemIndex = state.cart.findIndex((item) => item.id == itemId);
      if (itemIndex > -1) {
        const item = state.cart[itemIndex];
        item.count++
        state.cart[itemIndex] = item
      }
      return state;
    }
    case REDUCER_KEYS.cart.DECREASE_COUNT: {
      const  itemId  = action.data;
      const itemIndex = state.cart.findIndex((item) => item.id == itemId);
      if (itemIndex > -1) {
        const item = state.cart[itemIndex];
        item.count--
        state.cart[itemIndex] = item
      }
      return state;
    }
    case REDUCER_KEYS.RESTORE_DATA: {
      state = action.data
      state.restored = true
      return state;
    }
    case REDUCER_KEYS.SET_RESTORED_DATA: {
      state.restored = true
      return state;
    }
    default: {
      return state;
    }
  }
}
