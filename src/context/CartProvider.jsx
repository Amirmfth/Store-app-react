import { createContext, useContext, useReducer } from "react";
import { sumProducts } from "../helpers/helper";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  totalPrice: 0,
  checkout: false,
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_ITEM": {
      if (!state.selectedItems.find((item) => item.id === payload.id)) {
        state.selectedItems.push({ ...payload, quantity: 1 });
      }
      return {
        ...state,
        ...sumProducts(state.selectedItems),
        checkout: false,
      };
    }

    case "REMOVE_ITEM": {
      const newSelectedItem = state.selectedItems.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItem],
        ...sumProducts(newSelectedItem),
      };
    }

    case "INCREASE": {
      const index = state.selectedItems.findIndex(
        (item) => item.id === payload.id
      );
      state.selectedItems[index].quantity++;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    }

    case "DECREASE": {
      const index = state.selectedItems.findIndex(
        (item) => item.id === payload.id
      );
      state.selectedItems[index].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    }

    case "CHECKOUT": {
      return {
        selectedItems: [],
        itemsCounter: 0,
        totalPrice: 0,
        checkout: true,
      };
    }

    default:
      throw new Error("Invalid action!");
  }
};

const CartContext = createContext();

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const useCart = () => {
  const { state, dispatch } = useContext(CartContext);
  return [state, dispatch];
};

export { useCart };
export default CartProvider;
