using GastroLabApp.Data;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;

namespace GastroLabApp.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly DataContext context;

        public UsuarioRepository(DataContext context)
        {
            this.context = context;
        }
        public ICollection<Usuario> GetUsuarios()
        {
            return context.Usuarios.OrderBy(u => u.Id).ToList();
        }

        public Usuario GetUsuario(int UsuarioId)
        {
            return context.Usuarios.Where(u => u.Id == UsuarioId).FirstOrDefault();
        }

        public bool UpdateUsuario(Usuario usuario)
        {
            context.Update(usuario);
            return Save();
        }
        public bool UsuarioExist(int UsuarioId)
        {
            return context.Usuarios.Any(r => r.Id == UsuarioId);
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        bool IUsuarioRepository.CreateUsuario(Usuario usuario)
        {
            context.Add(usuario);
            return Save();
        }
    }
}
