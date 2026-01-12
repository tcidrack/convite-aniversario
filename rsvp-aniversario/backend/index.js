import express from "express"
import cors from "cors"
import fs from "fs"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3333
const DB_FILE = "./db.json"

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE))
}

app.get("/confirmacoes", (req, res) => {
  res.json(readDB())
})

app.post("/confirmacoes", (req, res) => {
  const db = readDB()
  const novo = { id: Date.now(), nome: req.body.nome }
  db.push(novo)
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
  res.json(novo)
})

app.listen(PORT, () => console.log("Servidor rodando na porta", PORT))
