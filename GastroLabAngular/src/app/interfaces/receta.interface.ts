
export interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  url:string;
  ValoracionMedia:number;
  usuarioId: number;
  ingredientesreceta: number[];
}
