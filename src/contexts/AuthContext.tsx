import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CyclePhase } from "@/data/products";

export interface User {
  name: string;
  email: string;
  cyclePhase?: CyclePhase;
  hasOrdered: boolean;
  favorites: string[];
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "processando" | "enviado" | "entregue";
  shipping: string;
}

interface AuthContextValue {
  user: User | null;
  signup: (name: string, email: string, password: string) => { ok: boolean; message: string };
  login: (email: string, password: string) => { ok: boolean; message: string };
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  toggleFavorite: (productId: string) => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Order;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "hibiscus-users";
const SESSION_KEY = "hibiscus-session";

interface StoredUser extends User {
  password: string;
}

function loadUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    const users = loadUsers();
    const found = users.find((u) => u.email === email);
    if (!found) return null;
    const { password: _p, ...rest } = found;
    return rest;
  });

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, user.email);
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const persistUser = (updated: User) => {
    const users = loadUsers();
    const idx = users.findIndex((u) => u.email === updated.email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...updated };
      saveUsers(users);
    }
    setUser(updated);
  };

  const signup = (name: string, email: string, password: string) => {
    const users = loadUsers();
    if (users.find((u) => u.email === email))
      return { ok: false, message: "Este e-mail já está cadastrado." };
    const newUser: StoredUser = {
      name,
      email,
      password,
      hasOrdered: false,
      favorites: [],
      orders: [],
    };
    saveUsers([...users, newUser]);
    const { password: _p, ...rest } = newUser;
    setUser(rest);
    return { ok: true, message: "Conta criada com sucesso!" };
  };

  const login = (email: string, password: string) => {
    const users = loadUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { ok: false, message: "E-mail ou senha incorretos." };
    const { password: _p, ...rest } = found;
    setUser(rest);
    return { ok: true, message: "Bem-vinda de volta!" };
  };

  const logout = () => setUser(null);

  const updateUser = (patch: Partial<User>) => {
    if (!user) return;
    persistUser({ ...user, ...patch });
  };

  const toggleFavorite = (productId: string) => {
    if (!user) return;
    const favorites = user.favorites.includes(productId)
      ? user.favorites.filter((id) => id !== productId)
      : [...user.favorites, productId];
    persistUser({ ...user, favorites });
  };

  const addOrder = (order: Omit<Order, "id" | "date" | "status">) => {
    const newOrder: Order = {
      ...order,
      id: `HBS-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      status: "processando",
    };
    if (user) {
      persistUser({
        ...user,
        hasOrdered: true,
        orders: [newOrder, ...user.orders],
      });
    }
    return newOrder;
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, updateUser, toggleFavorite, addOrder }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
