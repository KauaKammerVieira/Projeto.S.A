import { trilha, planoEstudo, historicoAvaliacao } from "../models/userModels.js";
import { perguntarGemini } from "../services/geminiService.js";

export async function gerarAvaliacao(req, res) {
  try {
    const { area } = req.body;
    const prompt = `
      Gere uma prova diagnóstica sobre ${area}.
      A prova deve avaliar se o aluno é Básico, Intermediário ou Avançado.
      Retorne APENAS um JSON neste formato, sem markdown, sem explicações:
      {
        "area": "${area}",
        "questoes": [
          {
            "pergunta": "Texto da pergunta",
            "nivel": "Iniciante",
            "alternativas": ["A", "B", "C"],
            "respostaCorreta": "A"
          }
        ]
      }
      Gere 10 questões.
    `;
    const respostaIA = await perguntarGemini(prompt);
    const clean = respostaIA.replace(/```json|```/g, "").trim();
    const avaliacao = JSON.parse(clean);
    return res.status(200).json(avaliacao);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao gerar avaliação", erro: error.message });
  }
}

export async function responderAvaliacao(req, res) {
  try {
    const { area, respostas } = req.body;
    const prompt = `
      Corrija a avaliação diagnóstica do aluno sobre ${area}.
      Respostas do aluno: ${JSON.stringify(respostas)}
      Retorne APENAS um JSON neste formato, sem markdown, sem explicações:
      {
        "pontuacao": 8,
        "nivelAnterior": "Básico",
        "nivelAtual": "Intermediário",
        "trilha": {
          "nome": "Trilha de ${area}",
          "area": "${area}",
          "nivelObjetivo": "Avançado",
          "planos": [
            {
              "titulo": "Título do plano",
              "descricao": "Descrição do plano.",
              "tempoEstimado": "2h",
              "ordem": 1
            }
          ]
        }
      }
    `;
    const respostaIA = await perguntarGemini(prompt);
    const clean = respostaIA.replace(/```json|```/g, "").trim();
    const dados = JSON.parse(clean);

    const novaTrilha = await trilha.create({
      nome: dados.trilha.nome,
      area: dados.trilha.area,
      nivelAtual: dados.nivelAtual,
      nivelObjetivo: dados.trilha.nivelObjetivo,
      status: "EM_ANDAMENTO",
      userId: req.usuario.id,
    });

    const avaliacao = await historicoAvaliacao.create({
      pontuacao: dados.pontuacao,
      nivelAnterior: dados.nivelAnterior,
      nivelAtual: dados.nivelAtual,
      dataAvaliacao: new Date(),
      userId: req.usuario.id,
      trilhaId: novaTrilha.id,
    });

    const planos = await planoEstudo.bulkCreate(
      dados.trilha.planos.map((plano) => ({
        titulo: plano.titulo,
        descricao: plano.descricao,
        tempoEstimado: plano.tempoEstimado,
        ordem: plano.ordem,
        progresso: 0,
        status: "PENDENTE",
        trilhaId: novaTrilha.id,
      }))
    );

    return res.status(201).json({
      mensagem: "Avaliação corrigida, trilha criada e planos salvos.",
      avaliacao,
      trilha: novaTrilha,
      planos,
    });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao responder avaliação", erro: error.message });
  }
}

export async function listarTrilhas(req, res) {
  try {
    const trilhas = await trilha.findAll({
      where: { userId: req.usuario.id },
      include: [{ model: planoEstudo, as: "planoEstudo" }],
    });
    return res.status(200).json(trilhas);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao listar as trilhas", erro: error.message });
  }
}

export async function buscarTrilha(req, res) {
  try {
    const { id } = req.params;
    const trilhaEncontrada = await trilha.findOne({
      where: { id, userId: req.usuario.id },
      include: [planoEstudo],
    });
    if (!trilhaEncontrada) return res.status(404).json({ mensagem: "Trilha não encontrada" });
    return res.status(200).json(trilhaEncontrada);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao buscar a trilha", erro: error.message });
  }
}

export async function atualizarTrilha(req, res) {
  try {
    const { id } = req.params;
    const trilhaEncontrada = await trilha.findOne({ where: { id, userId: req.usuario.id } });
    if (!trilhaEncontrada) return res.status(404).json({ mensagem: "Trilha não encontrada" });
    await trilhaEncontrada.update(req.body);
    return res.status(200).json(trilhaEncontrada);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao atualizar a trilha", erro: error.message });
  }
}

export async function excluirTrilha(req, res) {
  try {
    const { id } = req.params;
    const trilhaEncontrada = await trilha.findOne({ where: { id, userId: req.usuario.id } });
    if (!trilhaEncontrada) return res.status(404).json({ mensagem: "Trilha não encontrada" });
    await trilhaEncontrada.destroy();
    return res.status(200).json({ mensagem: "Trilha excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro ao excluir a trilha", erro: error.message });
  }
}