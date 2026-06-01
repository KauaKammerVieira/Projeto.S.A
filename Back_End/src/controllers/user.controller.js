import * as userModel from "../models/userModels.js"
import bcrypt from 'bcryptjs';

export async function listarUsuarios(req, res) {
    try {
        const usuarios = await userModel.users.findAll({
            attributes: {exclude: ["senha"]}
        })

        return res.status(200).json(usuarios)
    } catch (error) {
        return res.status(500).json({ error: "Erro ao buscar usuários"})
    }
    
}

export async function buscarPerfil(req, res) {
    try {
        const { id } = req.usuario

        const usuarios = await userModel.users.findOne({
            where:{ id },
            attributes: {exclude:["senha"]}
        })

        if(!usuarios){
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        return res.status(200).json(usuarios)

    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar o usuário"})
    }
    
}

export async function buscarPerfilUser(req, res) {
    try {
        const { id } = req.params

        const usuarios = await userModel.users.findByPk(id)

        if(!usuarios){
            console.log(usuarios)
            return res.status(404).json({error: "Usuário não encontrado"})
        }

        return res.status(200).json(usuarios)

    } catch (error) {
        return res.status(500).json({error: "Erro ao buscar o usuário"})
    }
    
}