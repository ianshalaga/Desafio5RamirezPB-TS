import Cart from "./Cart";

interface DbCart extends Cart {
  _id: string;
}

export default DbCart;
