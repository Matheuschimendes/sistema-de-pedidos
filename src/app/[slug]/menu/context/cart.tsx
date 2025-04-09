"use client"
import { Product } from "@prisma/client";
import { createContext, useState, type ReactNode } from "react";

interface CartProduct extends Product {
  quantity: number;
}

export interface ICartContext {
  isOpen: boolean;
  products: CartProduct[];
  toggleCard: () => void;
}

export const CartContext = createContext<ICartContext>({
  isOpen: false,
  products: [],
  toggleCard: () => { },

});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCard = () => {
    setIsOpen(prev => !prev )
  }
  return (
    <CartContext.Provider value={{
      isOpen: isOpen,
      products:  products,
      toggleCard: toggleCard,
    }}>
      {children}
    </CartContext.Provider>
  )
};


