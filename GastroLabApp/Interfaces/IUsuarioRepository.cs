using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IUsuarioRepository
    {
        ICollection<Usuario> GetUsuarios();
    }
}
