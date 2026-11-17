import type { Clima } from "../types"

const URL_CLIMA =
  "https://api.open-meteo.com/v1/forecast?latitude=4.6286&longitude=-74.1515&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FBogota&forecast_days=10"

export async function obtenerClima(): Promise<Clima[]> {
  const respuesta = await fetch(URL_CLIMA)
  const datos = await respuesta.json()
  return datos.daily.time.map((fecha: string, i: number) => ({
    fecha,
    max: datos.daily.temperature_2m_max[i],
    min: datos.daily.temperature_2m_min[i],
    lluvia: datos.daily.precipitation_probability_max[i],
  }))
}