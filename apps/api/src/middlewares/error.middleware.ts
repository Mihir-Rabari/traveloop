import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";
import { sendError } from "../utils/response-handler";

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return sendError(res, err.statusCode, err.message);
  }

  // Handle Prisma errors
  if (err.name === "PrismaClientKnownRequestError") {
    return sendError(res, 400, "Database request failed", (err as any).message);
  }

  // Fallback for unexpected errors
  console.error("[Unexpected Error]:", err);
  return sendError(
    res,
    500,
    process.env.NODE_ENV === "development" ? err.message : "Internal Server Error"
  );
};
