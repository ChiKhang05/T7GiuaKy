import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

const CartContext = createContext(null);

// helper: normalize id (convert numeric string to number) for consistent comparisons
const normalizeId = (id) =>
  typeof id === "string" && !isNaN(Number(id)) ? Number(id) : id;

const loadCartFromStorage = () => {
  try {
    const raw = JSON.parse(localStorage.getItem("cart")) || [];
    if (!Array.isArray(raw)) return [];
    return raw.map((it) => ({
      ...it,
      id: normalizeId(it.id),
      quantity: Math.max(1, Number(it.quantity) || 1),
    }));
  } catch (err) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => loadCartFromStorage());

  // compute derived values
  const cartCount = cart.reduce((s, it) => s + (Number(it.quantity) || 0), 0);
  const totalPrice = cart.reduce(
    (s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0),
    0
  );

  // cross-tab sync: reload if storage changes in other tab
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== "cart") return;
      setCart(loadCartFromStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      // ignore
    }
  }, [cart]);

  const addToCart = useCallback((product) => {
    const pid = normalizeId(product.id);
    setCart((prev) => {
      const existing = prev.find((it) => normalizeId(it.id) === pid);
      if (existing) {
        return prev.map((it) =>
          normalizeId(it.id) === pid ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, { ...product, id: pid, quantity: 1 }];
    });
  }, []);

  const changeQuantity = useCallback((productId, qty) => {
    const q = Math.floor(Number(qty) || 0);
    setCart((prev) => {
      if (q <= 0)
        return prev.filter(
          (it) => normalizeId(it.id) !== normalizeId(productId)
        );
      return prev.map((it) =>
        normalizeId(it.id) === normalizeId(productId)
          ? { ...it, quantity: q }
          : it
      );
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((prev) =>
      prev.filter((it) => normalizeId(it.id) !== normalizeId(productId))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
