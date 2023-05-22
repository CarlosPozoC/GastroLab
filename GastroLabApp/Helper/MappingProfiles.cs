using AutoMapper;
using GastroLabApp.Dto;
using GastroLabApp.Models;

namespace GastroLabApp.Helper
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            CreateMap<Receta, RecetaDto>();
            CreateMap<Ingrediente, IngredienteDto>();
        }
    }
}
