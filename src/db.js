// Conexão com o banco de dados usando Prisma
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("✅ Conectado ao banco de dados!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar:", error.message);
  });

module.exports = prisma;