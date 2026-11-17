import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { obtenerRazas } from "../services/dogApi"
import type { Raza } from "../types"
import { nombrePerrito, medidaCorta } from "../utils/perritos"
import MapaRefugio from "../components/MapaRefugio"

function Ficha() {
  const { id } = useParams()
  const [raza, setRaza] = useState<Raza | null>(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerRazas().then((datos) => {
      const encontrada = datos.find((r) => r.id === id)
      setRaza(encontrada ?? null)
      setCargando(false)
    })
  }, [id])

  if (cargando) {
    return <p className="p-6 text-center">Cargando perrito...</p>
  }

  if (!raza) {
    return (
      <div className="p-6">
        <Link to="/" className="underline">Volver</Link>
        <p className="mt-4">No encontramos este perrito.</p>
      </div>
    )
  }

  const nombre = nombrePerrito(raza.id)
  const temperamentos = raza.temperament ? raza.temperament.split(", ") : []

  return (
    <div className="px-5 py-6">
      <Link to="/" className="inline-flex items-center gap-1 font-bold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Volver
      </Link>

      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <section className="relative px-4 pt-4 self-start">
          <div className="bg-white border-2 border-vino rounded p-3 pb-10 rotate-2 shadow-[0_6px_0_#7B1230]">
            <img src={raza.image?.url} alt={raza.name} className="w-full h-72 md:h-96 object-cover rounded-sm" />
          </div>
          <span className="absolute top-2 left-0 w-24 h-6 bg-rojo/80 -rotate-[24deg]"></span>
          <span className="absolute top-2 right-0 w-24 h-6 bg-rojo/80 rotate-[28deg]"></span>
          <span className="absolute bottom-0 right-8 -rotate-6 font-mano text-2xl bg-crema border-2 border-vino rounded-xl px-3">
            busca hogar
          </span>
        </section>

        <section className="flex flex-col gap-6">
          <div>
            <span className="bg-lila text-xs font-bold tracking-wider px-3 py-1 rounded-full">
              {raza.breed_group ?? "Sin grupo"}
            </span>
            <h1 className="font-titulo text-5xl mt-3">{nombre}</h1>
            <p className="mt-1">{raza.name}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-durazno rounded-2xl p-3">
              <p className="font-titulo text-lg">{raza.life_span.replace(" years", "")}</p>
              <p className="text-[10px] font-bold tracking-wider">AÑOS DE VIDA</p>
            </div>
            <div className="bg-vino text-crema rounded-2xl p-3">
              <p className="font-titulo text-lg">{medidaCorta(raza.weight.metric)}</p>
              <p className="text-[10px] font-bold tracking-wider">KG DE PESO</p>
            </div>
            <div className="bg-rosa rounded-2xl p-3">
              <p className="font-titulo text-lg">{medidaCorta(raza.height.metric)}</p>
              <p className="text-[10px] font-bold tracking-wider">CM DE ALTURA</p>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-widest mb-2">TEMPERAMENTO</h2>
            <div className="flex flex-wrap gap-2">
              {temperamentos.map((t) => (
                <span key={t} className="border-2 border-vino rounded-full px-3 py-1 text-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-widest mb-2">ACERCA DE {nombre.toUpperCase()}</h2>
            <p className="leading-relaxed">
              {raza.description ?? `${nombre} es un ${raza.name} que está buscando una familia.`}
            </p>
            {raza.bred_for && <p className="text-sm mt-2">Criado para: {raza.bred_for}</p>}
            {raza.origin && <p className="text-sm">Origen: {raza.origin}</p>}
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-widest mb-2">DÓNDE ESTÁ</h2>
            <MapaRefugio />
          </div>

          <div className="flex items-center justify-between gap-4 bg-white border-2 border-vino rounded-2xl p-4">
            <div>
              <p className="text-xs font-bold tracking-wider">ADOPCIÓN</p>
              <p className="font-titulo text-2xl">Sin costo</p>
            </div>
            <Link to={`/visita/${raza.id}`} className="bg-rojo text-white font-bold px-6 py-3 rounded-full">
              Agendar visita
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Ficha