using GastroLabApp.Models;

namespace GastroLabApp.Interfaces
{
    public interface IOpinionRepository
    {
        bool CreateOpinion(Opinion opinion);
        Opinion GetOpinion(int OpinionId);
        bool DeleteOpinion(Opinion opinion);
        bool OpinionExist(int OpinionId);
        bool Save();
    }
}
