import express from 'express'

const app = express()
const PORT = 3000

app.use(express.json())

//ROTA DE TESTE
app.get("/status", (req, res) => {
  res.json({message: "API Online"})
})

//sim 

app.post("/usuarios", (req, res) => {
  const { nome } = req.body 

  const novousuario = {
    id: contador++,
    nome
  }


  const novoItem = (
    {
      id: contador++,
      nome
    }
  )

  itens.push(novoItem)
  res.status(201).json(novoItem)
})

//atualizar

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const {nome} = req.body

  const usuarios = usuarios.find(i => i.id === id)

  if (!usuarios) {
    return res.status(484).json({message: "Usuário não encontrado"})
  }
});

//apaga

app.put("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const {nome} = req.body

  const usuarios = usuarios.find(i => i.id === id)

  if (!usuarios) {
    return res.status(484).json({message: "Usuário não encontrado"})
  }
});





app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

