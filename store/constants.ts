export const INITIAL_STATE = {
    restored: false,
    cart: []
}

export const REDUCER_KEYS = {
    RESTORE_DATA: 'restore_data',
    SET_RESTORED_DATA: 'set_restored_data',
    cart: {
        ADD_ITEM: "cart-add_item",
        REMOVE_ITEM: "cart-remove_item",
        UPDATE_ITEM: "cart-update_item",
        INCREASE_COUNT: "cart-increase_count",
        DECREASE_COUNT: "cart-decrease_count",
    }
}