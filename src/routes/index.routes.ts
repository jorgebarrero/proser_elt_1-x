// IMPORT ROUTER
import { Router } from "express";
const router = Router();

// IMPORT CONTROLLERS
import { indexWelcome } from "../controllers/index.controller";

// DEFINE ENDPOINTS
router.route("/").get(indexWelcome);

// EXPORT ROUTES
export default router;
