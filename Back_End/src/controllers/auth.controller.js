import * as model from '../models/userModels.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import "dotenv/config"

export async function cadastrar(req, res) {
    try {
        const { nome, email, senha } = req.body

        const senhaHash = await bcrypt.hash(senha, 10);

        const novoUser = await model.User.create({
            nome,
            email,
            senha: senhaHash
        });

        const userResponse = novoUser.toJSON()

        delete userResponse.senha

        console.log(userResponse)

        return res.status(201).json(userResponse);

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Erro ao criar usuário"
        });
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body

        const usuarios = await model.User.findOne({
            where: { email }
        })

        if (!usuarios) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            })
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuarios.senha
        )

        if (!senhaValida) {
            return res.status(401).json({
                error: "Senha inválida"
            })
        }

        const token = jwt.sign(
            { id: usuarios.id },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )

        return res.status(200).json({ token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Erro no login"
        })
    }
}