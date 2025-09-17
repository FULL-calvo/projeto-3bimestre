// Importar as bibliotecas necessárias
const express = require("express");
const dotenv = require("dotenv");
const prisma = require("./db");
const storeRoutes = require("./routes/storeRoutes");
const productRoutes = require("./routes/productRoutes");

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
    const { name, email } = req.body;
    const novoUsuario = await prisma.user.create({
      data: { name, email }
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({ message: "API Online" });
});