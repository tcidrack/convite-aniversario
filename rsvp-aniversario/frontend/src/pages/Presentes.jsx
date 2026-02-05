import sapato from "../assets/sapato.png"
import roupa from "../assets/roupa.png"
import brinquedo from "../assets/brinquedo.png"

export default function Presentes() {
  return (
    <div className="invite-page presentes-page">
      <section className="presentes">
        <h1>Sugestões de Presentes 🎁</h1>

        <div className="presente">
          <img
            src={sapato}
            alt="Ícone de sapatinho"
            className="presente-icone"
          />
          Meu pezinho é tamanho 22
        </div>

        <div className="presente">
          <img
            src={roupa}
            alt="Ícone de roupa"
            className="presente-icone"
          />
          Visto de 1 a 2 anos
        </div>

        <div className="presente">
          <img
            src={brinquedo}
            alt="Ícone de brinquedo"
            className="presente-icone"
          />
          Gosto de brinquedos animados
        </div>

        <a href="/" className="voltar">
          ⬅ Voltar para o convite
        </a>
      </section>
    </div>
  )
}
