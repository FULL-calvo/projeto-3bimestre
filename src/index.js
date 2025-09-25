// Importar as bibliotecas necessárias
import express from "express";
import dotenv from "dotenv";
import prisma from "./db.js";
import storeRoutes from "./routes/storeRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/stores", storeRoutes);
app.use("/products", productRoutes);

//Healthcheck
app.get("/", (_req, res) => res.json({ ok: true, service: "API 3º Bimestre" }));

//CREATE: POST /usuarios
app.post("/usuarios", async (req, res) => {
  try {
    const { name, email, senha } = req.body;
    const novoUsuario = await prisma.user.create({
      data: { name, email, senha }
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

//READ: GET /usuarios
app.get("/usuarios", async (_req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      orderBy: { id: "asc" }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
});

//UPDATE: PUT /usuarios/:id
app.put("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, senha } = req.body;
      // Verifica se o usuário existe antes de atualizar
      const usuarioExistente = await prisma.user.findUnique({ where: { id: Number(id) } });
      if (!usuarioExistente) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      const usuarioAtualizado = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, senha }
    });
    res.json(usuarioAtualizado);
  } catch (error) {
    console.error("Erro PUT /usuarios/:id:", error);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
    if (error.code === "P2002") {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
});

//DELETE: DELETE /usuarios/:id
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: Number(id) }
    });
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error) {
    console.error("Erro DELETE /usuarios/:id:", error);
    res.status(500).json({ error: "Erro ao remover usuário" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({ message: "API Online" });
});