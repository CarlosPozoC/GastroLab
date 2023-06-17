using GastroLabApp.Data;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;

namespace GastroLabApp.Repository
{
    public class OpinionRepository : IOpinionRepository
    {
        private readonly DataContext context;

        public OpinionRepository(DataContext context)
        {
            this.context = context;
        }
        public bool CreateOpinion(Opinion opinion)
        {
            context.Add(opinion);
            return Save();
        }

        public bool OpinionExist(int OpinionId)
        {
            return context.Opiniones.Any(o => o.Id == OpinionId);
        }

        public bool Save()
        {
            var saved = context.SaveChanges();
            return saved > 0 ? true : false;
        }

        bool IOpinionRepository.DeleteOpinion(Opinion opinion)
        {
            context.Remove(opinion);
            return Save();
        }

        Opinion IOpinionRepository.GetOpinion(int OpinionId)
        {
            return context.Opiniones.Where(o => o.Id == OpinionId).FirstOrDefault();
        }

        public Usuario GetUsuarioOpinion(int OpinionId)
        {
            return context.Usuarios.FirstOrDefault(u => u.Opiniones.Any(o => o.Id == OpinionId));
        }
    }
}
