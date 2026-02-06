import { useEffect, useState } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../services/firebase"

export default function Admin() {
  const [confirmados, setConfirmados] = useState([])

  useEffect(() => {
    async function carregarConfirmados() {
      try {
        const q = query(
          collection(db, "confirmacoes"),
          orderBy("createdAt", "desc")
        )

        const snapshot = await getDocs(q)

        setConfirmados(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
        )
      } catch (error) {
        console.error("Erro ao carregar confirmados:", error)
      }
    }

    carregarConfirmados()
  }, [])

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h1>Lista de Confirmados 🍉</h1>

        {confirmados.length === 0 && (
          <p>Nenhum convidado confirmado ainda.</p>
        )}

        <ul>
          {confirmados.map(c => (
            <li key={c.id}>🍉 {c.nome}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
