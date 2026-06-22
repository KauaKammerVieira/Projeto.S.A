import { Router } from "express";
import {
  listarUsuarios,
  buscarPerfil,
  buscarPerfilUser,
  atualizarPerfil,
  alterarSenha,
  atualizarTrilha,
} from "../controllers/user.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", autenticar, listarUsuarios);

router.get("/me", autenticar, buscarPerfil);

router.get("/:id", autenticar, buscarPerfilUser);

router.put("/me", autenticar, atualizarPerfil);

router.put("/me/senha", autenticar, alterarSenha);

router.put("/me/trilha", autenticar, atualizarTrilha);

export default router;