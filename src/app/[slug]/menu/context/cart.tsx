"use client"
import { Product } from "@prisma/client";
import { createContext, useState, type ReactNode } from "react";

interface CartProduct extends Pick<Product, "id" | "name" | "price" | "imageUrl"> {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCard: () => void;
  addProduct: (Product: CartProduct) => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCard: () => {},
  addProduct: () => {},

});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCard = () => {
    setIsOpen(prev => !prev)
  }

  const addProduct = (product: CartProduct) => {
    setProducts((prev) => [...prev, product])
  }

  return (
    <CartContext.Provider value={{
      isOpen: isOpen,
      products: products,
      toggleCard: toggleCard,
      addProduct
    }}>
      {children}
    </CartContext.Provider>
  )
};


