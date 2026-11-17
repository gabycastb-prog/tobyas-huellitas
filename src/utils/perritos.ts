import type { Raza } from "../types"

const NOMBRES = ["Tobyas", "Alaska", "Benjamin", "Kenay", "Bjorn", "Luna", "Max", "Canela", "Rocco", "Mila", "Nala", "Coco"]
export function nombrePerrito(id: string): string {
  return NOMBRES[Number(id) % NOMBRES.length]
}

export function tamanoRaza(raza: Raza): string {
  const partes = raza.weight.metric.split("-")
  const pesoMaximo = parseInt(partes[1] ?? partes[0])
  if (pesoMaximo <= 10) return "pequeno"
  if (pesoMaximo <= 25) return "mediano"
  return "grande"
}

export function medidaCorta(medida: string): string {
  return medida.split(";")[0].replace("Male: ", "")
}