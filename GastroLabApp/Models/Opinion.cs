namespace GastroLabApp.Models
{
    public class Opinion
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public Usuario Usuario { get; set;}
    }
}
