import UpdateProduct from "../interfaces/UpdateProduct";
import { z } from "zod";

const updateProductSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    code: z.string().optional(),
    price: z.number().optional(),
    stock: z.number().optional(),
    category: z.string().optional(),
    status: z.boolean().optional(),
    thumbnail: z.array(z.string()).optional(),
  })
  .strict();

function validateUpdateProduct(data: any): UpdateProduct {
  const validationResult = updateProductSchema.safeParse(data);
  if (validationResult.success) {
    return validationResult.data;
  } else {
    throw new Error("Objeto de actuaización inválido.");
  }
}

export default validateUpdateProduct;
