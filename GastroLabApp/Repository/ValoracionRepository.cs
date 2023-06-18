using GastroLabApp.Data;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;

namespace GastroLabApp.Repository
{
    public class ValoracionRepository:IValoracionRepository
    {
        private readonly DataContext context;

        public ValoracionRepository(DataContext context)
        {
            this.context = context;
        }
        public bool CreateValoracion(Valoracion valoracion)
        {
            context.Add(valoracion);
            return Save();
        }

        public bool ValoracionExist(int ValoracionId)
        {
            return context.Valoraciones.Any(o => o.Id == ValoracionId);
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }
        public ICollection<Valoracion> GetValoraciones(int RecetaId)
        {
            return context.Valoraciones.Where(v => v.receta.Id == RecetaId).ToList();
        }
    }
}
