import cartsModel from "../models/carts.model";
import DbCart from "../../interfaces/DbCart";
import Cart from "../../interfaces/Cart";
import ProductManagerDB from "./ProductManagerDB";
import DbProduct from "../../interfaces/DbProduct";

export class CartManagerDB {
  constructor() {}

  // @@@@
  async createCart(): Promise<void> {
    try {
      const cart: Cart = { products: [] };
      await cartsModel.create(cart);
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async getCartById(id: string): Promise<DbCart> {
    try {
      const cart = await cartsModel.findById(id);
      const dbCart: DbCart = await cart.toObject();
      return dbCart;
    } catch (error) {
      throw error;
    }
  }

  // @@@@
  async addProductToCart(cid: string, pid: string): Promise<void> {
    try {
      const productManagerDB: ProductManagerDB = new ProductManagerDB();
      const product: DbProduct = await productManagerDB.getProductById(pid);
      let cart: DbCart = await this.getCartById(cid);

      let productExist = false;

      const updatedCart = cart.products.map((productInCart) => {
        if (productInCart.product.toString() === product._id.toString()) {
          console.log(productExist);
          productExist = true;
          const productCart = {
            product: productInCart.product,
            quantity: productInCart.quantity + 1,
          };
          productInCart = productCart;
        }
        return productInCart;
      });

      cart = {
        _id: cart._id,
        products: updatedCart,
      };

      if (!productExist) {
        const productCart = {
          product: product._id,
          quantity: 1,
        };
        cart.products.push(productCart);
      }

      await cartsModel.updateOne({ _id: cid }, { $set: cart });
    } catch (error) {
      throw error;
    }
  }
}
