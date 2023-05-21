using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IRecetaRepository
    {
        ICollection<Receta> GetRecetas();
        Receta GetReceta(int id);
        bool RecetaExist(int id);
    }
}
