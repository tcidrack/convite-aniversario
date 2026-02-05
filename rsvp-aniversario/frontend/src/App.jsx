import { BrowserRouter, Routes, Route } from "react-router-dom"
import Invite from "./pages/Invite"
import Presentes from "./pages/Presentes"
import Admin from "./pages/Admin"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route path="/presentes" element={<Presentes />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
