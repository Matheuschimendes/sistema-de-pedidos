import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../context/cart";

const CartSheet = () => {

  const {isOpen, toggleCard, products} = useContext(CartContext);

  return ( 
    <Sheet open={isOpen} onOpenChange={toggleCard}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {products.map(product => (
              <h1>{product.name} {product.quantity}</h1>
            ))}
          </SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
   );
}
 
export default CartSheet;