using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IIngredienteRepository
    {
        ICollection<Ingrediente> GetIngredientes();
    }
}
