import type { Raza } from "../types"

const API_KEY = import.meta.env.VITE_DOG_API_KEY
const BASE_URL = "https://api.thedogapi.com/v1"

export async function obtenerRazas(): Promise<Raza[]> {
  const respuesta = await fetch(`${BASE_URL}/breeds?limit=40&page=0`, {
    headers: { "x-api-key": API_KEY },
  })
  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los perritos")
  }
  const datos = await respuesta.json()
  return datos.filter((raza: Raza) => raza.image)
}