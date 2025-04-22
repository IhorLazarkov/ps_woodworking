import { createContext, useContext, useState, useEffect } from "react";


// Create context
const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart function
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCart((prev) => 
      prev
        .map(item =>
          item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
        )
        .filter(item => item.quantity > 0)
      );
  };

  // Clear cart function
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for convenience
export function useCart() {
  return useContext(CartContext);
}
