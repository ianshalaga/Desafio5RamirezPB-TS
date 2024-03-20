import QueryParams from "../interfaces/QueryParams";
import { z } from "zod";

const queryParamsSchema = z.object({
  limit: z.string().optional(),
});

function validateQueryParams(data: any): QueryParams {
  let validatedData: QueryParams = null;
  const validationResult = queryParamsSchema.safeParse(data);
  if (validationResult.success) {
    if (validationResult.data.limit) {
      if (!isNaN(parseInt(validationResult.data.limit)))
        validatedData = validationResult.data;
    } else {
      validatedData = { limit: null };
    }
  }
  return validatedData;
}

export default validateQueryParams;
