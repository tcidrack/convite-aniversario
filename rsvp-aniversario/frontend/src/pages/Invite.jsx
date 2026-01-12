import { useState } from "react"
import api from "../services/api"

export default function Invite() {
  const [nome, setNome] = useState("")

  const endereco = "Rua das Flores, 123 - São Paulo"
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`
  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Aniversário da Isadora&dates=20260404T150000/20260404T180000&location=${encodeURIComponent(endereco)}`

  async function confirmar() {
    if (!nome) return alert("Digite seu nome 💕")
    await api.post("/confirmacoes", { nome })
    window.open(calendarUrl)
    alert("Presença confirmada! 💖")
    setNome("")
  }

  return (
    <div className="invite-container">
      <div className="card">
        <h1>🧜‍♀️ Isadora faz 1 aninho!</h1>
        <p className="subtitle">04 de Abril às 15h</p>
        <p className="address">📍 {endereco}</p>

        <a className="map-btn" href={mapsUrl} target="_blank">
          Abrir local no Maps
        </a>

        <input
          placeholder="Digite seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <button onClick={confirmar}>Confirmar Presença</button>
      </div>
    </div>
  )
}
