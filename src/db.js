// Conexão com o banco de dados usando Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("✅ Conectado ao banco de dados!");
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar:", error.message);
  });

export default prisma;