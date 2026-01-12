import { BrowserRouter, Routes, Route } from "react-router-dom"
import Invite from "./pages/Invite"
import Admin from "./pages/Admin"
import "./index.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
