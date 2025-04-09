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
  toggleCard: () => { },
  addProduct: () => { },

});

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleCard = () => {
    setIsOpen(prev => !prev)
  }
  const addProduct = (product: CartProduct) => {
    // verificar se o produto ja esta no carrinho
    // se estiver, aumente a sua quantidade
    // se nao estiver, o adicione

    const productIsAlreadyOnTheCart = products.some((prevProduct) => prevProduct.id === product.id
    )

    if (!productIsAlreadyOnTheCart) {
      return setProducts((prev) => [...prev, product]);
    }
    setProducts(prevProducts => {
      return prevProducts.map(prevProduct => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          }
        }
        return prevProduct
      })
    })
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
}