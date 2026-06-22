import express from 'express'
import sequelize from './src/config/database.js'
import routerAuth from './src/routes/auth.router.js'
import routerUser from './src/routes/user.router.js'
import 'dotenv/config'
import { autenticar } from './src/middlewares/auth.middleware.js'
import { corsOption } from './src/config/cors.js'
import { helmetConfig } from './src/config/helmet.js'
import { limitGlobal , limitLocal } from './src/config/rateLimit.js'
import trilhaRoutes from "./src/routes/trilha.routes.js";

const app = express()
app.use(express.json());
app.use(corsOption)
app.use(helmetConfig)

app.use('/auth',limitLocal, routerAuth)
app.use('/user',limitGlobal, autenticar, routerUser)

app.use("/trilhas", trilhaRoutes);


sequelize.sync({ alter: true }) 
  .then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
  })
  .catch(err => console.log("Erro ao sincronizar banco:", err));