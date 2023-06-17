using GastroLabApp.Data;
using GastroLabApp.Dto;
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
        public bool UpdateIngrediente(Ingrediente ingrediente)
        {
            context.Update(ingrediente);
            return Save();
        }

        bool IIngredienteRepository.CreateIngrediente(Ingrediente ingrediente)
        {
            context.Add(ingrediente);
            return Save();
        }
        bool IIngredienteRepository.DeleteIngrediente(Ingrediente ingrediente)
        {
            context.Remove(ingrediente);
            return Save();
        }
        public bool IngredienteExist(int IngredienteId)
        {
            return context.Ingredientes.Any(r => r.Id == IngredienteId);
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}