using GastroLabApp.Data;
using GastroLabApp.Dto;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.OpenApi.Any;

namespace GastroLabApp.Repository
{
    public class RecetaRepository : IRecetaRepository
    {
        private readonly DataContext context;

        public RecetaRepository(DataContext context)
        {
            this.context = context;
        }
        public ICollection<Receta> GetRecetas()
        {
            return context.Recetas.OrderBy(r=>r.Id).ToList();
        }

        public Receta GetReceta(int RecetaId)
        {
            return context.Recetas.Where(r => r.Id==RecetaId).FirstOrDefault();
        }
        
        public ICollection<Ingrediente> GetIngredientesByReceta(int RecetaId)
        {
            return context.RecetasIngredientes.Where(re=>re.RecetaId==RecetaId).Select(i=>i.Ingrediente).ToList();
        }

        public ICollection<Opinion> GetOpinionesByReceta(int RecetaId)
        {
            return context.Opiniones.Where(re => re.receta.Id == RecetaId).ToList();
        }

        public bool UpdateReceta(Receta receta, List<int> IngredienteId)
        {
            List<RecetaIngrediente> recetaIngredientes = context.RecetasIngredientes.Where(r => r.RecetaId == receta.Id).ToList();
            foreach (RecetaIngrediente recetaIngrediente in recetaIngredientes)
            {
                context.Remove(recetaIngrediente);
            }
            foreach (int Id in IngredienteId)
            {
                var ingredienteEntity = context.Ingredientes.Where(i => i.Id == Id).FirstOrDefault();
                var RecetaIngrediente = new RecetaIngrediente()
                {
                    Receta = receta,
                    Ingrediente = ingredienteEntity
                };
                context.Update(RecetaIngrediente);
            }
            context.Update(receta);
            return Save();
        }

        public bool DeleteReceta(int RecetaId)
        {
            Receta receta= context.Recetas.Where(r => r.Id == RecetaId).FirstOrDefault();
            List<RecetaIngrediente> recetaIngredientes = context.RecetasIngredientes.Where(r => r.RecetaId == RecetaId).ToList();
            foreach (RecetaIngrediente recetaIngrediente in recetaIngredientes)
            {
                context.Remove(recetaIngrediente);
            }
            context.Remove(receta);
            return Save();
        }
        public bool RecetaExist(int RecetaId)
        {
            return context.Recetas.Any(r => r.Id==RecetaId);
        }

        public bool Save() 
        { 
            var saved=context.SaveChanges();
            return saved>0?true:false;
        }

        bool IRecetaRepository.CreateReceta(List<int> IngredienteId, Receta receta)
        {
            foreach(int Id in IngredienteId)
            {
                var ingredienteEntity = context.Ingredientes.Where(i => i.Id == Id).FirstOrDefault();
                var RecetaIngrediente = new RecetaIngrediente()
                {
                    Receta = receta,
                    Ingrediente = ingredienteEntity
                };
                context.Add(RecetaIngrediente);
            }
            context.Add(receta);
            return Save();
        }
    }
}
