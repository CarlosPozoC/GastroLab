using GastroLabApp.Models;

namespace GastroLabApp.Dto
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public ICollection<Receta>? Recetas { get; set; }
        public string Sexo { get; set; }
    }
}
