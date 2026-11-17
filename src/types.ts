export type Raza = {
  id: string
  name: string
  temperament?: string
  life_span: string
  bred_for?: string
  breed_group?: string
  origin?: string
  reference_image_id: string
  description?: string
  image?: { url: string }
  weight: { metric: string }
  height: { metric: string }
}

export type Clima = {
  fecha: string
  max: number
  min: number
  lluvia: number
}

export type DiaVisita = {
  texto: string
  corto: string
  numero: number
  cerrado: boolean
}