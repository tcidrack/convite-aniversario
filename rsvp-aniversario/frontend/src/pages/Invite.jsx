import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import api from "../services/api"

import videoMagali from "../assets/video-magali.mp4"
import melanciaCentro from "../assets/melancia-centro.gif"
import numero1 from "../assets/numero-1.png"

export default function Invite() {
  const [nome, setNome] = useState("")
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)

  const videoRef = useRef(null)

  const [audioAtivo, setAudioAtivo] = useState(false)
  const [volume, setVolume] = useState(1)

  function ativarSom() {
    setAudioAtivo(true)

    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = volume
      videoRef.current.play()
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  const endereco =
    "Rua Monsenhor Vicente Martins, 1795 - Henrique Jorge"

  const mapsUrl =
    "https://maps.app.goo.gl/1t5JZv4pcgNQxKQj6"

  const calendarUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=Aniversário da Maria Isadora&dates=20260405T170000/20260405T200000&location=" +
    encodeURIComponent(endereco)

  async function confirmarPresenca() {
    if (!nome.trim()) {
      alert("Digite seu nome 💖")
      return
    }

    try {
      await api.post("/confirmacoes", {
        nome,
        data: new Date().toISOString(),
      })

      setNome("")
      setMostrarConfirmacao(false)

      window.open(calendarUrl, "_blank")
    } catch (error) {
      console.error(error)
      alert("Não foi possível confirmar agora. Tente novamente 💔")
    }
  }

  return (
    <div className="invite-page">

      {/* ===== VÍDEO ===== */}
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

        {audioAtivo && (
          <div className="controle-volume">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>
        )}
      </div>

      {/* ===== CAPA ===== */}
      <section className="hero">
        <h1 className="nome">
          {"Maria Isadora".split("").map((l, i) => (
            <span key={i}>{l === " " ? "\u00A0" : l}</span>
          ))}
        </h1>

        <div className="idade-badge">
          <img src={numero1} alt="1" className="numero-1" />
          {"aninho".split("").map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>

        <div className="mensagem-box">
          <p className="mensagem">
            Venha se divertir comigo no meu aniversário!
          </p>

          <img
            src="/src/assets/magali-direita.gif"
            className="magali-texto"
            alt="Magali"
          />
        </div>
      </section>

      {/* ===== DATA ===== */}
      <section className="data-box">
        <div className="data-item">
          <span className="numero">05</span>
          <span className="texto">Abril</span>
        </div>

        <img src={melanciaCentro} alt="Melancia" className="melancia" />

        <div className="data-item">
          <span className="numero">17</span>
          <span className="texto">horas</span>
        </div>
      </section>

      {/* ===== AÇÕES ===== */}
      <section className="acoes">
        <a href={mapsUrl} target="_blank" className="acao">
          <span className="material-symbols-outlined">location_on</span>
          <span className="acao-texto">Local da festa</span>
        </a>

        <Link to="/presentes" className="acao">
          <span className="material-symbols-outlined">
            featured_seasonal_and_gifts
          </span>
          <span className="acao-texto">Lista de presentes</span>
        </Link>

        <button
          type="button"
          className="acao"
          onClick={() => setMostrarConfirmacao(true)}
        >
          <span className="material-symbols-outlined">person_check</span>
          <span className="acao-texto">Confirmar presença</span>
        </button>
      </section>

      {/* ===== MODAL CONFIRMAÇÃO ===== */}
      {mostrarConfirmacao && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-modal"
              onClick={() => setMostrarConfirmacao(false)}
            >
              ✖
            </button>

            <h2>Confirme sua presença 💖</h2>
            <p>
              Digite seu nome para aparecer na lista de convidados confirmados.
            </p>

            <input
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <button className="btn-confirmar" onClick={confirmarPresenca}>
              Confirmar presença 🍉
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
