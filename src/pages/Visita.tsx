import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { obtenerClima } from "../services/clima"
import type { Clima, DiaVisita } from "../types"
import { fechaLarga, fechaTexto, proximosDias } from "../utils/fechas"
import { nombrePerrito } from "../utils/perritos"
import SemanaVisita from "../components/SemanaVisita"
import ClimaDia from "../components/ClimaDia"

const HORARIOS = [
  { hora: "9:00 a. m.", lleno: false },
  { hora: "10:30 a. m.", lleno: false },
  { hora: "2:00 p. m.", lleno: true },
  { hora: "3:30 p. m.", lleno: false },
]

const MAX_PERSONAS = 3

function Visita() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [climas, setClimas] = useState<Clima[]>([])
  const [diaElegido, setDiaElegido] = useState("")
  const [hora, setHora] = useState("")
  const [personas, setPersonas] = useState(1)
  const [error, setError] = useState("")

  useEffect(() => {
    obtenerClima().then((datos) => setClimas(datos))
  }, [])

  const dias: DiaVisita[] = proximosDias(7).map((fecha) => ({
    texto: fechaTexto(fecha),
    corto: fecha.toLocaleDateString("es-CO", { weekday: "short" }),
    numero: fecha.getDate(),
    cerrado: fecha.getDay() === 0,
  }))

  const climaDia = climas.find((c) => c.fecha === diaElegido)
  const nombre = nombrePerrito(id ?? "0")

  function continuar() {
    if (!diaElegido || !hora) {
      setError("Elige un día y un horario para continuar.")
      return
    }
    navigate(`/solicitud/${id}`, { state: { fecha: diaElegido, hora, personas } })
  }

  return (
    <div className="px-5 py-6">
      <Link to={`/perrito/${id}`} className="inline-flex items-center gap-1 font-bold">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Volver
      </Link>

      <div className="bg-rojo rounded-3xl p-4 md:p-6 mt-4 flex flex-col gap-4">
        <div className="text-crema">
          <p className="text-xs font-bold tracking-widest">PASO 2 DE 3</p>
          <h1 className="font-titulo text-4xl">Visita para conocer a {nombre}</h1>
        </div>

        <section className="bg-crema rounded-md overflow-hidden">
          <div className="borde-puntos"></div>
          <div className="p-4 text-center">
            <p className="text-xs font-bold tracking-widest">ELIGE EL DÍA</p>
            <h2 className="font-titulo text-3xl mb-4">
              {new Date(`${dias[0].texto}T00:00:00`).toLocaleDateString("es-CO", { month: "long", year: "numeric" })}
            </h2>
            <SemanaVisita dias={dias} elegido={diaElegido} onElegir={setDiaElegido} />
            <p className="text-sm text-left mt-3">El refugio no abre los domingos.</p>
          </div>
        </section>

        <ClimaDia clima={climaDia} />

        <section className="bg-crema rounded-2xl p-4">
          <h2 className="text-xs font-bold tracking-widest mb-3">HORARIO</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HORARIOS.map((h) => (
              <button
                key={h.hora}
                disabled={h.lleno}
                onClick={() => setHora(h.hora)}
                className={`flex flex-col items-center min-h-14 justify-center rounded-xl border-2 ${
                  h.lleno
                    ? "border-dashed border-vino/40 text-vino/50 cursor-not-allowed"
                    : hora === h.hora
                    ? "bg-vino text-crema border-vino"
                    : "bg-white border-vino"
                }`}
              >
                <span className="font-bold">{h.hora}</span>
                <span className="text-xs">{h.lleno ? "Sin cupos" : hora === h.hora ? "Elegido" : "Disponible"}</span>
              </button>
            ))}
          </div>

          <h2 className="text-xs font-bold tracking-widest mt-5 mb-3">¿CUÁNTAS PERSONAS VAN?</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setPersonas(Math.max(1, personas - 1))}
              className="w-11 h-11 rounded-full border-2 border-vino bg-white text-xl font-bold"
            >
              -
            </button>
            <span className="font-titulo text-3xl">{personas}</span>
            <button
              onClick={() => setPersonas(Math.min(MAX_PERSONAS, personas + 1))}
              className="w-11 h-11 rounded-full border-2 border-vino bg-vino text-crema text-xl font-bold"
            >
              +
            </button>
            <span className="text-sm">(Máx. {MAX_PERSONAS})</span>
          </div>
        </section>

        <div className="bg-lila rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold">
              {diaElegido ? fechaLarga(diaElegido) : "Sin día elegido"} {hora && `· ${hora}`}
            </p>
            <p className="font-titulo text-xl">{personas === 1 ? "1 persona" : `${personas} personas`}</p>
            {error && <p className="text-sm font-bold text-rojo mt-1">{error}</p>}
          </div>
          <button onClick={continuar} className="bg-vino text-crema font-bold px-6 py-3 rounded-full">
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Visita