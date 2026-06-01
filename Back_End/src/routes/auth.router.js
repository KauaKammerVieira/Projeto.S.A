import { Router } from "express";
import { cadastrar, login } from "../controllers/auth.controller.js";
import { limitLocal } from "../config/rateLimit.js";

const router = Router();

router.post("/cadastro", limitLocal ,cadastrar);

router.post("/login",limitLocal, login);

export default router;