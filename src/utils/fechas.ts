export function fechaTexto(fecha: Date): string {
  const anio = fecha.getFullYear()
  const mes = String(fecha.getMonth() + 1).padStart(2, "0")
  const dia = String(fecha.getDate()).padStart(2, "0")
  return `${anio}-${mes}-${dia}`
}

export function proximosDias(cantidad: number): Date[] {
  const dias: Date[] = []
  for (let i = 1; i <= cantidad; i++) {
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + i)
    dias.push(fecha)
  }
  return dias
}

export function fechaLarga(texto: string): string {
  const fecha = new Date(`${texto}T00:00:00`).toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
  return fecha.charAt(0).toUpperCase() + fecha.slice(1)
}
