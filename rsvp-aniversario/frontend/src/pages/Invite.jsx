import { useState, useRef } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"
import videoMagali from "../assets/video-magali.mp4"
import melanciaCentro from "../assets/melancia-centro.gif"
import numero1 from "../assets/numero-1.png"

export default function App() {
  const [nome, setNome] = useState("")
  const [mostrarPresentes, setMostrarPresentes] = useState(false)
  const videoRef = useRef(null)
  const [audioAtivo, setAudioAtivo] = useState(false)

  function ativarSom() {
    setAudioAtivo(true)

    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 1
      videoRef.current.play()
    }
  }

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
        ref={videoRef}
        src={videoMagali}
        autoPlay
        muted={!audioAtivo}
        loop
        playsInline
        preload="auto"
      />

      {!audioAtivo && (
        <button className="btn-som" onClick={ativarSom}>
          🔊 Ativar som
        </button>
      )}
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

        <div className="mensagem-box">
          <p className="mensagem">
            Venha se divertir comigo no meu aniversário!
          </p>

          {/* ===== MAGALI ===== */}
          <img
            src="/src/assets/magali-direita.gif"
            className="magali-texto"
            alt="Magali"
          />
        </div>
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

        <Link to="/presentes" className="acao acao-presentes">
          <span className="material-symbols-outlined">
            featured_seasonal_and_gifts
          </span>
          <span className="acao-texto">Lista de presentes</span>
        </Link>

        <button
          type="button"
          className="acao"
          onClick={() => {
            document
              .getElementById("confirmar")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="material-symbols-outlined">
            person_check
          </span>
          <span className="acao-texto">Confirmar presença</span>
        </button>
      </section>

      {/* ===== MAGALI ===== */}
      <img
        src="/src/assets/magali-esquerda.gif"
        className="magali magali-left"
        alt="Magali esquerda"
      />
    </div>
  )
}
