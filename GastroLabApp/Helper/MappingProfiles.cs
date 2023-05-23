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
            CreateMap<RecetaDto, Receta>();
            CreateMap<Ingrediente, IngredienteDto>();
            CreateMap<IngredienteDto, Ingrediente>();
            CreateMap<Usuario, UsuarioDto>();
            CreateMap<UsuarioDto, Usuario>();
        }
    }
}
