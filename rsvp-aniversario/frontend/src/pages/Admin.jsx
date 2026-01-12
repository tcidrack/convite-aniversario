import { useEffect, useState } from "react"
import api from "../services/api"

export default function Admin() {
  const [convidados, setConvidados] = useState([])

  useEffect(() => {
    api.get("/confirmacoes").then(res => setConvidados(res.data))
  }, [])

  return (
    <div className="invite-container">
      <div className="card">
        <h1>📋 Lista de Confirmados</h1>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome do Convidado</th>
            </tr>
          </thead>
          <tbody>
            {convidados.map((c, index) => (
              <tr key={c.id}>
                <td>{index + 1}</td>
                <td>{c.nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
