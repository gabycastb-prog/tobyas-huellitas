import { Link } from "react-router-dom"
import type { Raza } from "../types"
import { nombrePerrito } from "../utils/perritos"

type Props = {
  raza: Raza
}

function TarjetaPerrito({ raza }: Props) {
  return (
    <Link
      to={`/perrito/${raza.id}`}
      className="flex gap-3 items-center p-2 bg-white border-2 border-vino rounded-2xl hover:-translate-y-1 transition"
    >
      <img src={raza.image?.url} alt={raza.name} className="w-20 h-20 object-cover rounded-xl shrink-0" />
      <div className="min-w-0">
        <span className="inline-block bg-rosa text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full">
          {raza.breed_group ?? "Sin grupo"}
        </span>
        <h3 className="font-titulo text-xl leading-tight mt-1">{nombrePerrito(raza.id)}</h3>
        <p className="text-xs truncate">{raza.name} · {raza.life_span}</p>
      </div>
    </Link>
  )
}

export default TarjetaPerrito