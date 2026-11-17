import { Routes, Route } from "react-router-dom"
import Encabezado from "./components/Encabezado"
import MenuInferior from "./components/MenuInferior"
import Inicio from "./pages/Inicio"
import Ficha from "./pages/Ficha"
import Visita from "./pages/Visita"
import Solicitud from "./pages/Solicitud"

function App() {
  return (
    <div className="fondo-cuadricula min-h-screen pb-24 md:pb-0">
      <Encabezado />
      <main className="max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perrito/:id" element={<Ficha />} />
          <Route path="/visita/:id" element={<Visita />} />
          <Route path="/solicitud/:id" element={<Solicitud />} />
        </Routes>
      </main>
      <MenuInferior />
    </div>
  )
}

export default App