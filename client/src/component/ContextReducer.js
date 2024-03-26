import React, { createContext, useContext, useReducer } from "react";
const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          img: action.img,
          price: action.price,
          qty: action.qty,
          size:action.size
        },
      ];
    default:
      console.log("error in reducer");
  }
};
export const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartStateContext.Provider value={state}>
    <CartDispatchContext.Provider value={dispatch}>
      {children}
    </CartDispatchContext.Provider>
  </CartStateContext.Provider>
  );
};
export const useCart = () => useContext(CartStateContext);
export const useDispatchcart = () => useContext(CartDispatchContext);
