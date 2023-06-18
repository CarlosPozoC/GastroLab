namespace GastroLabApp.Models
{
    public class Receta
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public string Url { get; set; }
        public ICollection<RecetaIngrediente> IngredientesReceta { get; set; }
        public ICollection<Opinion>? Opiniones { get; set; }
        public ICollection<Valoracion>? Valoraciones { get; set; }
        public Usuario Usuario { get; set; }

    }
}
