using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IRecetaRepository
    {
        ICollection<Receta> GetRecetas();
        Receta GetReceta(int id);
        ICollection<Ingrediente> GetIngredientesByReceta(int id);
        ICollection<Opinion> GetOpinionesByReceta(int RecetaId);
        bool CreateReceta(List<int> IngredienteId, Receta receta);
        bool UpdateReceta(Receta receta);
        bool RecetaExist(int id);
        bool Save();
    }
}
