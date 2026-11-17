import { Link } from "react-router-dom"

function MenuInferior() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-vino text-crema grid grid-cols-4 pt-2 pb-4">
      <Link to="/" className="flex flex-col items-center gap-1 text-xs font-bold text-rosa">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" />
        </svg>
        Inicio
      </Link>
      <Link to="/" className="flex flex-col items-center gap-1 text-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        Buscar
      </Link>
      <Link to="/" className="flex flex-col items-center gap-1 text-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z" />
        </svg>
        Favoritos
      </Link>
      <Link to="/" className="flex flex-col items-center gap-1 text-xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        Perfil
      </Link>
    </nav>
  )
}

export default MenuInferior