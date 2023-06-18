namespace GastroLabApp.Models
{
    public class Valoracion
    {
        public int Id { get; set; }
        public int Valor { get; set; }
        public Receta receta { get; set; }
        public Usuario usuario { get; set;}
    }
}
