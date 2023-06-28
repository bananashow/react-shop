export interface mapType {
  ID: string;
  count: number;
}

export const handleSubtract = (
  e: React.MouseEvent<HTMLButtonElement>,
  id: string,
  calc: string,
  handleCartItems: (item: any) => void
) => {
  const cartStorage = window.localStorage;
  let cartItems = cartStorage.getItem("CART") as string | null;

  let parsedCartItems;
  if (cartItems !== null) {
    parsedCartItems = JSON.parse(cartItems);
    parsedCartItems = parsedCartItems.filter((item: mapType) => {
      if (id === item.ID && calc === "subtract") {
        item.count--;
      } else if (id === item.ID && calc === "add") {
        item.count++;
      }
      return item.count > 0;
    });
    cartItems = JSON.stringify(parsedCartItems);
    cartStorage.setItem("CART", cartItems);
    handleCartItems(cartItems);
  }
};
