import { Router } from "express";
import { 
  listarTrilhas, 
  buscarTrilha, 
  atualizarTrilha, 
  excluirTrilha, 
  gerarAvaliacao, 
  responderAvaliacao 
} from "../controllers/trilha.controller.js";
import { autenticar } from "../middlewares/auth.middleware.js"; // Ajuste o caminho se necessário

const router = Router();

router.post("/avaliacao", autenticar, gerarAvaliacao);
router.post("/avaliacao/responder", autenticar, responderAvaliacao);
router.get("", autenticar, listarTrilhas); // Remova a barra de dentro das aspas
router.get("/:id", autenticar, buscarTrilha);
router.put("/:id", autenticar, atualizarTrilha);
router.delete("/:id", autenticar, excluirTrilha);

export default router;