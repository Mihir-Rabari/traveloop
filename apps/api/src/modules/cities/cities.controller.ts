import { Request, Response } from "express";
import { citiesRepository } from "./cities.repository";
import { sendResponse } from "../../utils/response-handler";
import { asyncHandler } from "../../utils/async-handler";

export class CitiesController {
  searchCities = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    if (!q) {
      const popular = await citiesRepository.getPopularCities();
      return sendResponse(res, 200, "Popular cities retrieved", popular);
    }
    const cities = await citiesRepository.search(q as string);
    return sendResponse(res, 200, "Cities retrieved successfully", cities);
  });
}

export const citiesController = new CitiesController();
