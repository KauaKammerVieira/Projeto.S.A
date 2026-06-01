import express from 'express'
import sequelize from './src/config/database.js'
import routerAuth from './src/routes/auth.router.js'
import routerUser from './src/routes/user.router.js'
import 'dotenv/config'
import { autenticar } from './src/middlewares/auth.middleware.js'
import { corsOption } from './src/config/cors.js'
import { helmetConfig } from './src/config/helmet.js'
import { limitGlobal , limitLocal } from './src/config/rateLimit.js'

const app = express()
app.use(express.json());
app.use(corsOption)
app.use(helmetConfig)

app.use('/auth',limitLocal, routerAuth)
app.use('/user',limitGlobal, autenticar, routerUser)


sequelize.sync({alter: true}).then(() => {
    app.listen(process.env.SERVE_PORT, () => {
        console.log(`Servidor rodando em: localhost:${process.env.SERVE_PORT}`)
    })
}).catch(error => console.log("Erro ao acessar API/SERVE", error))