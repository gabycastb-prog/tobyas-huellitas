const LAT = 4.6286
const LON = -74.1515
const D = 0.01

function MapaRefugio() {
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${LON - D},${LAT - D},${LON + D},${LAT + D}&layer=mapnik&marker=${LAT},${LON}`
  const enlace = `https://www.openstreetmap.org/?mlat=${LAT}&mlon=${LON}#map=15/${LAT}/${LON}`

  return (
    <div className="border-2 border-vino rounded-2xl overflow-hidden bg-white">
      <iframe title="Mapa del refugio" src={src} className="w-full h-48" loading="lazy"></iframe>
      <div className="flex items-center justify-between p-3">
        <div>
          <p className="font-bold text-sm">Refugio Huellitas</p>
          <p className="text-xs">Kennedy, Bogotá</p>
        </div>
        <a href={enlace} target="_blank" rel="noreferrer" className="text-sm font-bold underline">
          Ver mapa
        </a>
      </div>
    </div>
  )
}

export default MapaRefugio