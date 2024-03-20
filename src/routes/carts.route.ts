import { Router, Request, Response } from "express";
import { productRoute } from "../utils/routes";
import { successStatus, failureStatus } from "../utils/statuses";
import { CartManagerDB } from "../dao/services/CartManagerDB";
import DbCart from "../interfaces/DbCart";

const cartsRouter: Router = Router();

/** GET ENDPOINT */
cartsRouter.get("/:cid", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    const cid: string = req.params.cid;
    const cart: DbCart = await cartManagerDB.getCartById(cid);
    res.json(cart);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

/** POST ENPOINTS */
cartsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const cartManagerDB: CartManagerDB = new CartManagerDB();
    await cartManagerDB.createCart();
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

cartsRouter.post(
  "/:cid" + productRoute + "/:pid",
  async (req: Request, res: Response) => {
    try {
      const cartManagerDB: CartManagerDB = new CartManagerDB();
      const cid: string = req.params.cid;
      const pid: string = req.params.pid;
      await cartManagerDB.addProductToCart(cid, pid);
      res.json(successStatus);
    } catch (error) {
      res.json(failureStatus(error.message));
    }
  }
);

export default cartsRouter;
