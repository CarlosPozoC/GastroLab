export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  url:string;
  usuarioId: number;
  ingredientesreceta: number[];
}
