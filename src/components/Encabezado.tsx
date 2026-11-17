import { Link } from "react-router-dom"

function Encabezado() {
  return (
    <header>
      <div className="bg-rosa">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-5 py-3">
          <p className="flex items-center gap-1 text-xs font-bold tracking-wider">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
              <circle cx="12" cy="9.5" r="2.5" />
            </svg>
            BOGOTÁ, COL
          </p>

          <Link to="/" className="flex flex-col items-center leading-none">
            <span className="font-logo text-2xl tracking-wide">TOBYAS</span>
            <span className="font-mano text-lg text-rojo -mt-1">by huellitas</span>
          </Link>

          <nav className="hidden md:flex gap-6 text-sm font-bold">
            <Link to="/" className="hover:text-rojo">INICIO</Link>
            <Link to="/" className="hover:text-rojo">ADOPTAR</Link>
            <Link to="/" className="hover:text-rojo">FAVORITOS</Link>
          </nav>

          <button aria-label="Notificaciones" className="md:hidden w-11 h-11 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
              <path d="M10 20a2 2 0 0 0 4 0" />
            </svg>
          </button>
        </div>
      </div>
      <div className="borde-ondulado"></div>
    </header>
  )
}

export default Encabezado