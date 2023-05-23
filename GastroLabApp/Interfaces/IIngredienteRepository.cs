using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IIngredienteRepository
    {
        ICollection<Ingrediente> GetIngredientes();
        Ingrediente GetIngrediente(int IngredienteId);
        bool UpdateIngrediente(Ingrediente ingrediente);
        bool CreateIngrediente(Ingrediente ingrediente);
        bool IngredienteExist(int IngredienteId);
        bool Save();
    }
}
