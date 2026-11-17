import { Link } from "react-router-dom"
import type { Raza } from "../types"
import { nombrePerrito } from "../utils/perritos"

type Props = {
  raza: Raza
}

function Destacado({ raza }: Props) {
  return (
    <section className="relative mt-6">
      <div className="bg-white border-2 border-vino rounded-md p-3 pb-4 -rotate-2 shadow-[0_6px_0_#7B1230]">
        <div className="relative">
          <img src={raza.image?.url} alt={raza.name} className="w-full h-64 object-cover rounded" />
          <span className="absolute top-3 left-3 bg-vino text-crema text-[10px] font-bold tracking-widest px-3 py-1 rounded-full">
            DESTACADO
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 pt-3">
          <div>
            <h2 className="font-titulo text-3xl leading-none">{nombrePerrito(raza.id)}</h2>
            <p className="text-sm mt-1">{raza.name}</p>
          </div>
          <Link to={`/perrito/${raza.id}`} className="bg-rojo text-white text-sm font-bold px-5 py-3 rounded-full">
            Conocer
          </Link>
        </div>
      </div>
      <span className="absolute -top-4 -right-1 rotate-6 font-mano text-2xl text-rojo bg-crema border-2 border-rojo rounded-full px-2">
        ¡adóptame!
      </span>
    </section>
  )
}

export default Destacado