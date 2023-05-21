using GastroLabApp.Data;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;

namespace GastroLabApp.Repository
{
    public class IngredienteRepository : IIngredienteRepository
    {
        private readonly DataContext context;

        public IngredienteRepository(DataContext context)
        {
            this.context = context;
        }
        public ICollection<Ingrediente> GetIngredientes()
        {
            return context.Ingredientes.OrderBy(i => i.Id).ToList();
        }
        public Ingrediente GetIngrediente(int IngredienteId)
        {
            return context.Ingredientes.Where(i => i.Id == IngredienteId).FirstOrDefault();
        }
    }
}