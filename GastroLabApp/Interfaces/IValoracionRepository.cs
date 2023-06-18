using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IValoracionRepository
    {
        bool CreateValoracion(Valoracion valoracion);
        ICollection<Valoracion> GetValoraciones(int RecetaId);
        bool ValoracionExist(int ValoracionId);
        bool Save();
    }
}
