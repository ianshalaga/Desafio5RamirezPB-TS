import { Router, Request, Response } from "express";
import ProductManagerDB from "../dao/services/ProductManagerDB";
import QueryParams from "../interfaces/QueryParams";
import UpdateProduct from "../interfaces/UpdateProduct";
import { successStatus, failureStatus } from "../utils/statuses";
import validateQueryParams from "../validators/queryParams";
import validateUpdateProduct from "../validators/updateProduct";
import Product from "../interfaces/Product";
import DbProduct from "../interfaces/DbProduct";

const productsRouter: Router = Router();

/** GET ENDPOINTS */
productsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    let limitParsed: number = await productManagerDB.getTotalProducts();
    const queryParams: QueryParams = validateQueryParams(req.query);
    if (!queryParams) {
      throw new Error("Query Params inválidos.");
    }
    const { limit } = queryParams;
    if (limit) {
      limitParsed = parseInt(limit);
    }
    const products: DbProduct[] = await productManagerDB.getProducts(
      limitParsed
    );
    res.json(products);
  } catch (error) {
    res.status(404).json(failureStatus(error.message));
  }
});

productsRouter.get("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    const product = await productManagerDB.getProductById(pid);
    res.json(product);
  } catch (error) {
    res.status(404).json(failureStatus(error.message));
  }
});

/** POST ENDPOINT */
productsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const product: Product = req.body;
    await productManagerDB.addProduct(product);
    res.json(successStatus);
  } catch (error) {
    res.status(500).json(failureStatus(error.message));
  }
});

/** PUT ENDPOINT */
productsRouter.put("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    const updateProperties: UpdateProduct = validateUpdateProduct(req.body);
    await productManagerDB.updateProduct(pid, updateProperties);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

/** DELETE ENDPOINT */
productsRouter.delete("/:pid", async (req: Request, res: Response) => {
  try {
    const productManagerDB: ProductManagerDB = new ProductManagerDB();
    const pid: string = req.params.pid;
    await productManagerDB.deleteProduct(pid);
    res.json(successStatus);
  } catch (error) {
    res.json(failureStatus(error.message));
  }
});

export default productsRouter;
