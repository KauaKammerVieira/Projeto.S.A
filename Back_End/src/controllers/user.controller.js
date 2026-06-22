import bcrypt from "bcrypt";
import { User } from "../models/userModels.js";

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await User.findAll({ attributes: { exclude: ["senha"] } });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao listar usuários." });
  }
};

export const buscarPerfil = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.usuario.id, {
      attributes: { exclude: ["senha"] },
    });
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar perfil." });
  }
};

export const buscarPerfilUser = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id, {
      attributes: { exclude: ["senha"] },
    });
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar usuário." });
  }
};

export const atualizarPerfil = async (req, res) => {
  try {
    const { nome, email } = req.body;
    const usuario = await User.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });

    await usuario.update({ nome, email });

    const { senha, ...dados } = usuario.toJSON();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar perfil." });
  }
};

export const alterarSenha = async (req, res) => {
  try {
    const { senhaAntiga, senhaNova } = req.body;
    const usuario = await User.findByPk(req.usuario.id);
    if (!usuario) return res.status(404).json({ mensagem: "Usuário não encontrado." });

    const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
    if (!senhaCorreta) return res.status(400).json({ mensagem: "Senha atual incorreta." });

    await usuario.update({ senha: await bcrypt.hash(senhaNova, 10) });
    res.json({ mensagem: "Senha alterada com sucesso." });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao alterar senha." });
  }
};

// 👇 AQUI ESTÁ A NOVA FUNÇÃO QUE EU ADICIONEI 👇
export const atualizarTrilha = async (req, res) => {
  try {
    const { area, nivel } = req.body;
    const usuario = await User.findByPk(req.usuario.id);
    
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado." });
    }

    // Atualiza os campos de área e nível no banco de dados
    await usuario.update({ area, nivel });

    // Retorna os dados do usuário sem a senha para segurança
    const { senha, ...dados } = usuario.toJSON();
    res.json({ mensagem: "Trilha salva com sucesso no perfil do usuário!", usuario: dados });
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao atualizar a trilha." });
  }
};