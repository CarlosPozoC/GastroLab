namespace GastroLabApp.Models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public int Calorias { get; set; }
        public ICollection<RecetaIngrediente> RecetasIngrediente { get; set; }
    }
}
