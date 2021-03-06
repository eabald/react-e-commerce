import CartActionTypes from './cart.types'
import { addItemToCart, removeItemFromCart } from './cart.utils'

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  error: null
}


const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      }
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      }
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload)
      }
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        )
      }
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: []
      }
    case CartActionTypes.GET_DATABSE_CART_SUCCESS:
    case CartActionTypes.UPDATE_DATABASE_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload
      }
    case CartActionTypes.GET_DATABSE_CART_FAILURE:
    case CartActionTypes.UPDATE_DATABASE_CART_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default cartReducer
