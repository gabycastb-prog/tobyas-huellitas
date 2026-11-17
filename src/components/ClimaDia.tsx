import type { Clima } from "../types"

type Props = {
  clima?: Clima
}

function ClimaDia({ clima }: Props) {
  if (!clima) {
    return <p className="bg-rosa rounded-2xl p-4 text-sm">Elige un día para ver el clima.</p>
  }

  return (
    <div className="bg-rosa rounded-2xl p-4 flex items-center gap-4">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9.5z" />
        <path d="M9 21l1-2M13 21l1-2" />
      </svg>
      <div>
        <p className="text-xs font-bold tracking-wider">CLIMA PREVISTO EN KENNEDY</p>
        <p className="font-titulo text-2xl">
          {Math.round(clima.min)}° - {Math.round(clima.max)}° C
        </p>
        <p className="text-sm">
          {clima.lluvia}% de probabilidad de lluvia.{" "}
          {clima.lluvia >= 50 ? "Lleva sombrilla para el paseo." : "Buen día para conocer a tu perrito."}
        </p>
      </div>
    </div>
  )
}

export default ClimaDia