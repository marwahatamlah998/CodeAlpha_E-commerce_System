"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

type CartItem = {
  productname: string;
  price: number;
  quantity: number;
};

interface AuthContextType {
  token: string | null;
  setToken: (t: string | null) => void;
  roleId: string | null;
  setRoleId: (rId: string | null) => void;
  userId: string | null;
  setUserId: (uId: string | null) => void;
  role: string | null;
  SetRole: (r: string | null) => void;
carts: CartItem[];
setCarts: Dispatch<SetStateAction<CartItem[]>>;
  productID: string | null;
  SetProductID: (pi: string | null) => void;

}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  roleId: null,
  setRoleId: () => {},
  userId: null,
  setUserId: () => {},
  role: null,
  SetRole: () => {},
  carts: [],
  setCarts: () => {},
  productID: null,
  SetProductID: () => {},

});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);
  const [role, SetRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [carts, setCarts] = useState<CartItem[]>([]);
  const [productID, SetProductID] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("token");

    setToken(t);
    const uId =
      typeof window !== "undefined" ? localStorage.getItem("userId") : null;
    setUserId(uId);

    const rId =
      typeof window !== "undefined" ? localStorage.getItem("roleId") : null;
    setRoleId(rId);

    const pi =
      typeof window !== "undefined" ? localStorage.getItem("productID") : null;
    SetProductID(pi);
  }, []);

useEffect(() => {
  const storedCarts = localStorage.getItem("carts");

  if (storedCarts) {
    setCarts(JSON.parse(storedCarts));
  }
}, []);

useEffect(() => {
  localStorage.setItem("carts", JSON.stringify(carts));
}, [carts]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        roleId,
        setRoleId,
        userId,
        setUserId,
        role,
        SetRole,
        carts,
        setCarts,
        productID, 
        SetProductID
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
