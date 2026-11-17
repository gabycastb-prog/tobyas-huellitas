type Categoria = {
  id: string
  nombre: string
  color: string
}

type Props = {
  categorias: Categoria[]
  activa: string
  onCambiar: (id: string) => void
}

function Categorias({ categorias, activa, onCambiar }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          onClick={() => onCambiar(categoria.id)}
          className={`h-20 rounded-2xl font-bold border-4 ${categoria.color} ${
            activa === categoria.id ? "border-rojo" : "border-transparent"
          }`}
        >
          {categoria.nombre}
        </button>
      ))}
    </div>
  )
}

export default Categorias