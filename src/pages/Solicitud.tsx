import { useEffect, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { obtenerRazas } from "../services/dogApi"
import type { Raza } from "../types"
import { nombrePerrito } from "../utils/perritos"
import { fechaLarga } from "../utils/fechas"

type DatosVisita = {
  fecha: string
  hora: string
  personas: number
}

const VIVIENDAS = ["Casa con patio", "Apartamento", "Finca"]

function Solicitud() {
  const { id } = useParams()
  const location = useLocation()
  const visita = location.state as DatosVisita | null

  const [raza, setRaza] = useState<Raza | null>(null)
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [celular, setCelular] = useState("")
  const [vivienda, setVivienda] = useState("")
  const [acepta, setAcepta] = useState(false)
  const [error, setError] = useState("")
  const [codigo, setCodigo] = useState("")

  useEffect(() => {
    obtenerRazas().then((datos) => {
      const encontrada = datos.find((r) => r.id === id)
      setRaza(encontrada ?? null)
    })
  }, [id])

  const nombrePerro = nombrePerrito(id ?? "0")

  function enviar() {
    if (nombre.trim() === "") {
      setError("Escribe tu nombre completo.")
      return
    }
    const arroba = correo.indexOf("@")
    const punto = correo.lastIndexOf(".")
    if (arroba < 1 || punto < arroba + 2 || punto === correo.length - 1) {
      setError("Escribe un correo válido.")
      return
    }
    if (celular.length !== 10 || isNaN(Number(celular))) {
      setError("El celular debe tener 10 números.")
      return
    }
    if (vivienda === "") {
      setError(`Cuéntanos dónde viviría ${nombrePerro}.`)
      return
    }
    if (!acepta) {
      setError("Debes aceptar el compromiso de adopción responsable.")
      return
    }
    setError("")
    setCodigo(`TB-${id}-${Date.now().toString().slice(-4)}`)
  }

  if (!visita) {
    return (
      <div className="px-5 py-6">
        <p>Primero debes agendar la visita.</p>
        <Link to={`/visita/${id}`} className="inline-block mt-4 bg-rojo text-white font-bold px-6 py-3 rounded-full">
          Agendar visita
        </Link>
      </div>
    )
  }

  if (codigo) {
    return (
      <div className="px-5 py-10 flex flex-col items-center text-center max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-durazno border-4 border-vino flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </div>
        <p className="font-mano text-3xl text-rojo -rotate-3 mt-4">¡{nombrePerro} te espera!</p>
        <h1 className="font-titulo text-5xl mt-1">Solicitud enviada</h1>
        <p className="mt-3">Te enviaremos la confirmación de la visita a {correo}.</p>

        <div className="w-full bg-white border-2 border-vino rounded-2xl p-5 mt-6 text-left shadow-[0_6px_0_#7B1230]">
          <p className="text-xs font-bold tracking-widest">CÓDIGO DE SOLICITUD</p>
          <p className="font-logo text-3xl text-rojo tracking-wider">{codigo}</p>
          <p className="mt-3"><span className="font-bold">{nombrePerro}</span> · {raza?.name}</p>
          <p className="text-sm">{fechaLarga(visita.fecha)} · {visita.hora}</p>
          <p className="text-sm">{visita.personas === 1 ? "1 persona" : `${visita.personas} personas`} · {vivienda}</p>
        </div>

        <Link to="/" className="mt-8 bg-vino text-crema font-bold px-8 py-3 rounded-full">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="px-5 py-6">
      <Link to={`/visita/${id}`} className="inline-flex items-center gap-1 font-bold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Volver
      </Link>

      <div className="bg-lila rounded-3xl p-4 md:p-6 mt-4">
        <p className="text-xs font-bold tracking-widest">PASO 3 DE 3</p>
        <h1 className="font-titulo text-4xl">Solicitud de adopción</h1>

        <div className="grid md:grid-cols-2 gap-6 mt-5">
          <section className="bg-crema rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="text-xs font-bold tracking-widest">TUS DATOS</h2>

            <label className="flex flex-col gap-1 text-sm font-bold">
              Nombre completo
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Ana María Gómez"
                className="h-12 px-4 border-2 border-vino rounded-xl bg-white font-normal outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold">
              Correo electrónico
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="tucorreo@ejemplo.com"
                className="h-12 px-4 border-2 border-vino rounded-xl bg-white font-normal outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold">
              Celular
              <input
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="3000000000"
                className="h-12 px-4 border-2 border-vino rounded-xl bg-white font-normal outline-none"
              />
            </label>

            <div>
              <p className="text-sm font-bold mb-2">¿Dónde viviría {nombrePerro}?</p>
              <div className="flex flex-wrap gap-2">
                {VIVIENDAS.map((v) => (
                  <button
                    key={v}
                    onClick={() => setVivienda(v)}
                    className={`min-h-11 px-4 rounded-full border-2 border-vino text-sm font-bold ${
                      vivienda === v ? "bg-vino text-crema" : "bg-white"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={acepta}
                onChange={(e) => setAcepta(e.target.checked)}
                className="w-5 h-5 mt-0.5 accent-rojo"
              />
              Me comprometo a una adopción responsable y acepto los términos y condiciones.
            </label>
          </section>

          <aside className="flex flex-col gap-4">
            <div className="bg-white border-2 border-vino rounded-2xl p-5">
              <h2 className="text-xs font-bold tracking-widest mb-3">RESUMEN</h2>
              {raza && (
                <div className="flex items-center gap-3 mb-4">
                  <img src={raza.image?.url} alt={raza.name} className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <p className="font-titulo text-2xl leading-none">{nombrePerro}</p>
                    <p className="text-sm">{raza.name}</p>
                  </div>
                </div>
              )}
              <div className="flex justify-between py-1 text-sm">
                <span>Visita</span>
                <span className="font-bold">{fechaLarga(visita.fecha)}</span>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span>Hora</span>
                <span className="font-bold">{visita.hora}</span>
              </div>
              <div className="flex justify-between pt-2 mt-1 text-sm border-t-2 border-dashed border-rosa">
                <span>Personas</span>
                <span className="font-bold">{visita.personas}</span>
              </div>
            </div>

            {error && <p className="font-bold text-rojo">{error}</p>}
            <button onClick={enviar} className="w-full bg-rojo text-white font-bold py-4 rounded-full">
              Enviar solicitud
            </button>
            <p className="text-xs text-center">Solicitud simulada: no se envía ningún dato real.</p>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Solicitud