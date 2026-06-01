import { Router } from "express";
import { listarUsuarios, buscarPerfil, buscarPerfilUser} from "../controllers/user.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", autenticar, listarUsuarios);

router.get("/me", autenticar, buscarPerfil);

router.get('/:id', autenticar, buscarPerfilUser)

export default router;