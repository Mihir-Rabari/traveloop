import { Router } from "express";
import { citiesController } from "./cities.controller";

const router = Router();

router.get("/search", citiesController.searchCities);

export default router;
