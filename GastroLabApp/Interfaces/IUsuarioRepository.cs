using GastroLabApp.Models;
using System.Collections.Generic;

namespace GastroLabApp.Interfaces
{
    public interface IUsuarioRepository
    {
        ICollection<Usuario> GetUsuarios();
        Usuario GetUsuario(int UsuarioId);
        bool UpdateUsuario(Usuario usuario);
        bool CreateUsuario(Usuario usuario);
        bool UsuarioExist(int UsuarioId);
        bool Save();
        ICollection<Opinion> GetOpinionesByUsuario(int UsuarioId);
        ICollection<Receta> GetRecetasByUsuario(int UsuarioId);
    }
}

