import type { DiaVisita } from "../types"

type Props = {
  dias: DiaVisita[]
  elegido: string
  onElegir: (texto: string) => void
}

function SemanaVisita({ dias, elegido, onElegir }: Props) {
  return (
    <div className="grid grid-cols-7 border-2 border-vino">
      {dias.map((dia) => (
        <button
          key={dia.texto}
          disabled={dia.cerrado}
          onClick={() => onElegir(dia.texto)}
          className={`flex flex-col items-center justify-center gap-0.5 min-h-20 border-r border-vino last:border-r-0 ${
            dia.cerrado
              ? "bg-vino text-rosa cursor-not-allowed"
              : elegido === dia.texto
              ? "bg-durazno"
              : "bg-white hover:bg-rosa-claro"
          }`}
        >
          <span className="text-[10px] font-bold uppercase">{dia.corto}</span>
          <span className="font-titulo text-2xl">{dia.numero}</span>
          <span className="text-[9px] font-bold">{dia.cerrado ? "CERRADO" : ""}</span>        </button>
      ))}
    </div>
  )
}

export default SemanaVisita