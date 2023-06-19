using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IValoracionRepository
    {
        bool CreateValoracion(Valoracion valoracion);
        int GetValoraciones(int RecetaId);
        bool ValoracionExist(int ValoracionId);
        bool Save();
    }
}
