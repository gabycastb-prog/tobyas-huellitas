import { useEffect, useState } from "react"
import { obtenerRazas } from "../services/dogApi"
import type { Raza } from "../types"
import { tamanoRaza } from "../utils/perritos"
import Destacado from "../components/Destacado"
import Categorias from "../components/Categorias"
import TarjetaPerrito from "../components/TarjetaPerrito"

const CATEGORIAS = [
  { id: "todos", nombre: "Todos", color: "bg-lila" },
  { id: "pequeno", nombre: "Pequeños", color: "bg-durazno" },
  { id: "mediano", nombre: "Medianos", color: "bg-vino text-crema" },
  { id: "grande", nombre: "Grandes", color: "bg-rosa" },
]


function Inicio() {
  const [razas, setRazas] = useState<Raza[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("todos")
  const [error, setError] = useState(false)
  

  useEffect(() => {
    obtenerRazas()
      .then((datos) => setRazas(datos))
      .catch(() => setError(true))
  }, [])

  const texto = busqueda.toLowerCase()
  const visibles = razas.filter(
    (raza) =>
      (categoria === "todos" || tamanoRaza(raza) === categoria) &&
      raza.name.toLowerCase().includes(texto)
  )
  if (error) {
    return <p className="p-6 text-center">No pudimos cargar los perritos. Revisa tu conexión e intenta de nuevo.</p>
  }

  if (razas.length === 0) {
    return <p className="p-6 text-center">Cargando perritos...</p>
  }

  return (
    <div className="px-5 py-6 flex flex-col gap-8">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-xs font-bold tracking-widest">(ADOPCIÓN RESPONSABLE EN BOGOTÁ)</p>
          <h1 className="font-titulo text-5xl md:text-6xl leading-none mt-2">El amigo peludo de tus sueños</h1>
          <p className="mt-4 max-w-md">
            Conoce perritos que buscan hogar, agenda una visita y empieza tu proceso de adopción.
          </p>
        </div>
        <Destacado raza={razas[0]} />
      </section>

      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Busca por raza..."
        className="h-12 px-5 bg-white border-2 border-vino rounded-full outline-none"
      />

      <section>
        <h2 className="text-xs font-bold tracking-widest mb-3">BUSCA POR TAMAÑO</h2>
        <Categorias categorias={CATEGORIAS} activa={categoria} onCambiar={setCategoria} />
      </section>

      <section>
        <h2 className="font-titulo text-3xl mb-3">Sugeridos para ti</h2>
        {visibles.length === 0 && <p>No encontramos perritos con ese filtro.</p>}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {visibles.map((raza) => (
            <TarjetaPerrito key={raza.id} raza={raza} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Inicio