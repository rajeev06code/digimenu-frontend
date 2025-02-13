import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [tableInfo, setTableInfo] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeCart = (restaurantId, tableNo) => {
    if (!isInitialized) {
      const newTableInfo = { restaurantId, tableNo };
      setTableInfo(newTableInfo);

      const savedCart = localStorage.getItem(`cart_${restaurantId}_${tableNo}`);
      if (savedCart) {
        console.log(savedCart);
        setCartItems(JSON.parse(savedCart));
      }
      setIsInitialized(true);
    }
  };

  // Only update localStorage when cart changes and initialization is complete
  useEffect(() => {
    if (isInitialized && tableInfo) {
      localStorage.setItem(
        `cart_${tableInfo.restaurantId}_${tableInfo.tableNo}`,
        JSON.stringify(cartItems)
      );
    }
  }, [cartItems, tableInfo, isInitialized]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i._id === itemId);
      if (!item) return prev;

      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        return prev.filter((i) => i._id !== itemId);
      }

      return prev.map((i) =>
        i._id === itemId ? { ...i, quantity: newQuantity } : i
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (tableInfo) {
      localStorage.removeItem(
        `cart_${tableInfo.restaurantId}_${tableInfo.tableNo}`
      );
    }
    setIsInitialized(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        clearCart,
        initializeCart,
        tableInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
