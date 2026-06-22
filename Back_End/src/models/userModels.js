import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

// Modelo de Usuário (O seu original)
export const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("admin", "user"), defaultValue: "user" },
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { timestamps: true }
);

// Modelo de Trilha
export const trilha = sequelize.define(
  "Trilha",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    area: { type: DataTypes.STRING, allowNull: false },
    nivelAtual: { type: DataTypes.STRING, allowNull: false },
    nivelObjetivo: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "EM_ANDAMENTO" },
  },
  { timestamps: true }
);

// Modelo de Planos de Estudo
export const planoEstudo = sequelize.define(
  "PlanoEstudo",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.TEXT },
    tempoEstimado: { type: DataTypes.STRING },
    ordem: { type: DataTypes.INTEGER },
    progresso: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: "PENDENTE" },
  },
  { timestamps: true }
);

// Modelo de Histórico de Avaliações
export const historicoAvaliacao = sequelize.define(
  "HistoricoAvaliacao",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    pontuacao: { type: DataTypes.INTEGER, allowNull: false },
    nivelAnterior: { type: DataTypes.STRING },
    nivelAtual: { type: DataTypes.STRING },
    dataAvaliacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: true }
);

// ================= COLOQUE OS RELACIONAMENTOS AQUI =================



// Um Usuário tem muitas Trilhas
User.hasMany(trilha, { foreignKey: "userId", as: "trilhas" });
trilha.belongsTo(User, { foreignKey: "userId" });

// Uma Trilha tem muitos Planos de Estudo (ADICIONAMOS O "as" AQUI)
trilha.hasMany(planoEstudo, { foreignKey: "trilhaId", as: "planoEstudo" });
planoEstudo.belongsTo(trilha, { foreignKey: "trilhaId" });

// Relacionamentos do Histórico
User.hasMany(historicoAvaliacao, { foreignKey: "userId" });
historicoAvaliacao.belongsTo(User, { foreignKey: "userId" });

trilha.hasMany(historicoAvaliacao, { foreignKey: "trilhaId" });
historicoAvaliacao.belongsTo(trilha, { foreignKey: "trilhaId" });