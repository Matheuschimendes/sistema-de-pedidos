import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useContext } from "react";
import { CartContext } from "../../context/cart";

const CartSheet = () => {

  const {isOpen, toggleCard} = useContext(CartContext);

  return ( 
    <Sheet open={isOpen} onOpenChange={toggleCard}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Ola
          </SheetTitle>
        </SheetHeader>
      </SheetContent>

    </Sheet>
   );
}
 
export default CartSheet;