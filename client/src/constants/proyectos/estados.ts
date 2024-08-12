/**
 *             estadoRepository.save(new Estado("Propuesto", 1));
            estadoRepository.save(new Estado("En desarrollo", 1));
            estadoRepository.save(new Estado("Finalizado", 1));
            estadoRepository.save(new Estado("Cancelado", 1));
            estadoRepository.save(new Estado("Rechazado", 1));

 */
const ESTADOS = {
  propuesto: 1,
  desarrollo: 2,
  finalizado: 3,
  cancelado: 4,
  rechazado: 5,
} as const;

const TAREA_ESTADOS = {
  por_hacer : 6,
  en_progreso : 7,
  hecho : 8,
}

export {
  ESTADOS,
  TAREA_ESTADOS
};
