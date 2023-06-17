namespace GastroLabApp.Models
{
    public class Opinion
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public Receta receta { get; set; }
        public Usuario usuario { get; set;}
    }
}
