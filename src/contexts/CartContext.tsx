import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  fragrance?: string;
}

interface CartContextValue {
  items: CartItem[];
  add: (product: Product, fragrance?: string) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  coupon: { code: string; discount: number } | null;
  applyCoupon: (code: string, isFirstPurchase: boolean) => { ok: boolean; message: string };
  removeCoupon: () => void;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const COUPONS: Record<string, { discount: number; firstOnly?: boolean; label: string }> = {
  PRIMEIRA10: { discount: 0.1, firstOnly: true, label: "10% primeira compra" },
  LUNA15: { discount: 0.15, label: "15% off" },
  HIBISCUS20: { discount: 0.2, label: "20% off seleção" },
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("hibiscus-cart") || "[]");
    } catch {
      return [];
    }
  });
  const [coupon, setCoupon] = useState<CartContextValue["coupon"]>(null);

  useEffect(() => {
    localStorage.setItem("hibiscus-cart", JSON.stringify(items));
  }, [items]);

  const add = (product: Product, fragrance?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.fragrance === fragrance);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.fragrance === fragrance
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        );
      }
      return [...prev, { product, quantity: 1, fragrance }];
    });
  };

  const remove = (productId: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== productId));

  const setQuantity = (productId: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== productId)
        : prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    );

  const clear = () => {
    setItems([]);
    setCoupon(null);
  };

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = coupon ? subtotal * (1 - coupon.discount) : subtotal;

  const applyCoupon = (code: string, isFirstPurchase: boolean) => {
    const c = COUPONS[code.toUpperCase()];
    if (!c) return { ok: false, message: "Cupom inválido." };
    if (c.firstOnly && !isFirstPurchase)
      return { ok: false, message: "Este cupom é válido apenas na primeira compra." };
    setCoupon({ code: code.toUpperCase(), discount: c.discount });
    return { ok: true, message: `Cupom aplicado: ${c.label}` };
  };

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        setQuantity,
        clear,
        subtotal,
        count,
        coupon,
        applyCoupon,
        removeCoupon: () => setCoupon(null),
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
