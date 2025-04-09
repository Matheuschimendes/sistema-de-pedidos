"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format.currency";
import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import CartSheet from "./cart-sheet";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true
        }
      }
    }
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { toggleCard, addProduct } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    })
  }
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  {/* FUNÇÃO */}
  const handleAddToCart = () => {
    addProduct({
      ...product,
      quantity: quantity,
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    toggleCard();  
  }

  return (
    <>
    <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] p-5 flex-auto flex flex-col overflow-hidden">

      <div className="flex-auto overflow-hidden">
        {/* RESTAURANTE */}
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            height={16}
            width={16}
            className=" rounded-full"
          />
          <p className="text-sm text-muted-foreground">{product.restaurant.name}</p>
        </div>
        {/* NOME DO PRODUTO */}
        <h2 className="mt-1 text-xl font-semibold ">{product.name}</h2>

        {/* PREÇO E QUANTIDADE*/}
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button className="h-8 w-8 rounded-xl" variant="outline" onClick={handleDecreaseQuantity}>
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{quantity}</p>
            <Button className="h-8 w-8 rounded-xl" variant="destructive" onClick={handleIncreaseQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>

        </div>

        <ScrollArea className="h-full">
          {/* DESCRIÇÃO SOBRE*/}
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold ">Sobre</h4>
            <p className="text-sm text-muted-foreground">{product.description}</p>
          </div>

          {/* INGREDIENTES */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHatIcon size={18} />
              <h4 className="font-semibold ">Ingredientes</h4>
            </div>
            <ul className=" list-disc px-5 text-muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">{product.ingredients}</p>
          </div>
        </ScrollArea>
      </div>

      {/* ADICIONAR PEDIDO */}
      <Button className="rounded-full mt-3 w-full" onClick={handleAddToCart}>Adicionar à sacola</Button>

    </div> 
    <CartSheet />
    </>
  );
}

export default ProductDetails;