import { useEffect, useState } from "react"
import api from "../services/api"

export default function Admin() {
  const [confirmados, setConfirmados] = useState([])

  useEffect(() => {
    api.get("/confirmacoes").then((res) => {
      setConfirmados(res.data)
    })
  }, [])

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Lista de Confirmados 🍉</h1>

        {confirmados.length === 0 && (
          <p>Nenhum convidado confirmado ainda.</p>
        )}

        <ul>
          {confirmados.map((c) => (
            <li key={c.id}>🍉 {c.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
