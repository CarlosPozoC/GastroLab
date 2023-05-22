using GastroLabApp.Data;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;

namespace GastroLabApp.Repository
{
    public class RecetaRepository : IRecetaRepository
    {
        private readonly DataContext context;

        public RecetaRepository(DataContext context)
        {
            this.context = context;
        }
        public ICollection<Receta> GetRecetas()
        {
            return context.Recetas.OrderBy(r=>r.Id).ToList();
        }

        public Receta GetReceta(int RecetaId)
        {
            return context.Recetas.Where(r => r.Id==RecetaId).FirstOrDefault();
        }
        
        public ICollection<Ingrediente> GetIngredientesByReceta(int RecetaId)
        {
            return context.RecetasIngredientes.Where(re=>re.RecetaId==RecetaId).Select(i=>i.Ingrediente).ToList();
        }

        public bool RecetaExist(int RecetaId)
        {
            return context.Recetas.Any(r => r.Id==RecetaId);
        }
    }
}
