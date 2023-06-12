export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  usuarioId: number;
  ingredientes: number[];
}
