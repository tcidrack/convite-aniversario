import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../services/firebase"
import videoMagali from "../assets/video-magali.mp4"
import magali from "../assets/magali.gif"
import melanciaCentro from "../assets/melancia-centro.gif"
import numero1 from "../assets/numero-1.png"

export default function Invite() {
  const [nome, setNome] = useState("")
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)

  const videoRef = useRef(null)

  const [audioAtivo, setAudioAtivo] = useState(false)
  const [volume, setVolume] = useState(1)
  const [confirmando, setConfirmando] = useState(false)
  const [toast, setToast] = useState(null)

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

  const endereco = "Rua Monsenhor Vicente Martins, 1795 - Henrique Jorge"
  const mapsUrl = "https://maps.app.goo.gl/1t5JZv4pcgNQxKQj6"
  const calendarUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=Anivers%C3%A1rio%20da%20Maria%20Isadora&dates=20260405T170000/20260405T200000&location=" +
    encodeURIComponent(endereco)

  function salvarLocalmente(nomeConfirmado) {
    try {
      const listaAtual = JSON.parse(localStorage.getItem("confirmacoes") || "[]")
      const atualizado = [...listaAtual, { id: Date.now(), nome: nomeConfirmado, createdAt: new Date().toISOString() }]
      localStorage.setItem("confirmacoes", JSON.stringify(atualizado))
    } catch (err) {
      console.error("Erro ao salvar localmente:", err)
    }
  }

  function showToast(type, text, ms = 3000) {
    setToast({ type, text })
    setTimeout(() => setToast(null), ms)
  }

  async function confirmar() {
    const nomeTrim = nome.trim()
    if (!nomeTrim) {
      showToast("error", "Digite seu nome 💖")
      return
    }

    setConfirmando(true)

    try {
      if (!db) throw new Error("Firestore não inicializado")
      await addDoc(collection(db, "confirmacoes"), {
        nome: nomeTrim,
        createdAt: serverTimestamp(),
      })

      setNome("")
      setMostrarConfirmacao(false)
      showToast("success", "Presença confirmada! 🎉🍉")
      try {
        window.open(calendarUrl, "_blank")
      } catch (e) {
        console.info("Não foi possível abrir calendário:", e)
      }
    } catch (error) {
      console.error("Erro ao confirmar presença:", error)
      salvarLocalmente(nomeTrim)
      setNome("")
      setMostrarConfirmacao(false)
      showToast("info", "Não foi possível salvar no servidor — salvo localmente 👍")
    } finally {
      setConfirmando(false)
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
          style={{ borderRadius: 24, display: "block" }}
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
          <p className="mensagem">Venha se divertir comigo <br></br> no meu aniversário!</p>

          <img
            src={magali}
            className="magali"
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
        <a href={mapsUrl} target="_blank" rel="noreferrer" className="acao">
          <span className="material-symbols-outlined">location_on</span>
          <span className="acao-texto">Local da festa</span>
        </a>

        <Link to="/presentes" className="acao">
          <span className="material-symbols-outlined">featured_seasonal_and_gifts</span>
          <span className="acao-texto">Lista de presentes</span>
        </Link>

        <button type="button" className="acao" onClick={() => setMostrarConfirmacao(true)}>
          <span className="material-symbols-outlined">person_check</span>
          <span className="acao-texto">Confirmar presença</span>
        </button>
      </section>

      {/* ===== MODAL CONFIRMAÇÃO ===== */}
      {mostrarConfirmacao && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={() => setMostrarConfirmacao(false)}>
              ✖
            </button>

            <h2>Confirme sua presença 💖</h2>
            <p>Digite seu nome e sobrenome para aparecer na lista de convidados confirmados.</p>

            <input placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />

            <button className="btn-confirmar" onClick={confirmar} disabled={confirmando}>
              {confirmando ? "Confirmando..." : "Confirmar presença 🍉"}
            </button>
          </div>
        </div>
      )}

      {/* toast simples */}
      {toast && (
        <div
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 30,
            background: toast.type === "success" ? "#2ecc71" : toast.type === "error" ? "#e74c3c" : "#f1c40f",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 12,
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            zIndex: 9999,
            fontWeight: "700",
          }}
        >
          {toast.text}
        </div>
      )}
    </div>
  )
}
