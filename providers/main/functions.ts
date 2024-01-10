import { REDUCER_KEYS } from './constants';
import { IProviderState } from './types';
import { type ICartItem } from './types';

export default function functions(
  state: IProviderState,
  dispatch: (action: any) => void,
) {
  return {
    cart: {
      addItem(item: ICartItem) {
        dispatch({
          type: REDUCER_KEYS.cart.ADD_ITEM,
          data: item,
        });
      },
      removeItem(itemId: string) {
        dispatch({
          type: REDUCER_KEYS.cart.REMOVE_ITEM,
          data: itemId,
        });
      },
      increaseCount(itemId: string) {
        dispatch({
          type: REDUCER_KEYS.cart.INCREASE_COUNT,
          data: itemId,
        });
      },
      decreaseCount(itemId: string) {
        dispatch({
          type: REDUCER_KEYS.cart.DECREASE_COUNT,
          data: itemId,
        });
      },
      updateItem(itemId: string, key: string, value: string) {
        dispatch({
          type: REDUCER_KEYS.cart.UPDATE_ITEM,
          data: { itemId, key, value },
        });
      },
      getItem(itemId: string) {
        return state.cart.find((item) => item.id == itemId);
      },
    },
  };
}
