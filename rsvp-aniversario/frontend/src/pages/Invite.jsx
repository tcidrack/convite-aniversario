import { useState } from "react"
import api from "../services/api"
import videoMagali from "../assets/video-magali.mp4"
import melanciaCentro from "../assets/melancia-centro.gif"
import numero1 from "../assets/numero-1.png"

export default function App() {
  const [nome, setNome] = useState("")
  const [mostrarPresentes, setMostrarPresentes] = useState(false)

  const endereco =
    "Rua Monsenhor Vicente Martins, 1795 - Henrique Jorge"

  const mapsUrl =
    "https://maps.app.goo.gl/1t5JZv4pcgNQxKQj6"

  const calendarUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=Aniversário da Isadora&dates=20260405T170000/20260405T200000&location=" +
    encodeURIComponent(endereco)

  async function confirmar() {
    if (!nome) {
      alert("Digite seu nome 💖")
      return
    }

    await api.post("/confirmacoes", { nome })
    window.open(calendarUrl, "_blank")
    alert("Presença confirmada! 🍉")
    setNome("")
  }

  return (
    <div className="invite-page">

      <div className="video-topo">
        <video
          src={videoMagali}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      {/* ===== CAPA ===== */}
      <section className="hero">
        <h1 className="nome">Maria Isadora</h1>

        <div className="idade-badge">
          <img
          src={numero1}
          alt="numero 1"
          className="numero-1"
        />
          aninho
        </div>

        <p className="mensagem">
          Venha se divertir comigo no meu aniversário!
        </p>
        <img
          src="/src/assets/magali-direita.gif"
          className="magali magali-right"
          alt="Magali direita"
        />
      </section>

      {/* ===== DATA / HORÁRIO ===== */}
      <section className="data-box">
        <div className="data-item">
          <span className="numero">05</span>
          <span className="texto">Abril</span>
        </div>

        <img
          src={melanciaCentro}
          alt="Melancia"
          className="melancia"
        />

        <div className="data-item">
          <span className="numero">17</span>
          <span className="texto">horas</span>
        </div>
      </section>

      {/* ===== AÇÕES ===== */}
      <section className="acoes">
        <a href={mapsUrl} target="_blank" className="acao">
          <span className="material-symbols-outlined">
            location_on
          </span>
          <span className="acao-texto">Local da festa</span>
        </a>

        <a href="/presentes" className="acao acao-presentes">
          <span className="material-symbols-outlined icon">
            featured_seasonal_and_gifts
          </span>
          <span className="acao-texto">Lista de presentes</span>
        </a>

        <a href="#confirmar" className="acao">
          <span className="material-symbols-outlined">
            person_check
          </span>
          <span className="acao-texto">Confirmar presença</span>
        </a>
      </section>

      {/* ===== CONFIRMAR PRESENÇA ===== */}
      <section id="confirmar" className="confirmar-box">
        <input
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <button onClick={confirmar}>
          Confirmar Presença 🍉
        </button>
      </section>

      {/* ===== LISTA DE PRESENTES ===== */}
      {mostrarPresentes && (
        <section className="presentes">
          <h2>Sugestões de Presentes 🎁</h2>

          <div className="presente">
            🎀 Meu pezinho é tamanho 18
          </div>

          <div className="presente">
            👕 Visto de 1 a 2 anos
          </div>

          <div className="presente">
            🧸 Gosto de brinquedos animados
          </div>
        </section>
      )}

      {/* ===== MAGALI ===== */}
      <img
        src="/src/assets/magali-esquerda.gif"
        className="magali magali-left"
        alt="Magali esquerda"
      />
    </div>
  )
}
