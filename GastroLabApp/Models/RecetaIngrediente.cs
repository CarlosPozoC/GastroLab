namespace GastroLabApp.Models
{
    public class RecetaIngrediente
    {
        public int RecetaId { get; set; }
        public int IngredienteId { get; set; }
        public Receta Receta { get; set; }
        public Ingrediente Ingrediente { get; set; }
    }
}
