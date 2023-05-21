using GastroLabApp.Models;
using GastroLabApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using GastroLabApp.Dto;
using System.Collections.Generic;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecetaController: Controller
    {
        private readonly IRecetaRepository recetaRepository;
        private readonly IMapper mapper;

        public RecetaController(IRecetaRepository recetaRepository,IMapper mapper)
        {
            this.recetaRepository = recetaRepository;
            this.mapper = mapper;   
        }
        [HttpGet]
        [ProducesResponseType(200, Type=typeof(IEnumerable<Receta>))]
        public IActionResult GetRecetas() 
        {
            var recetas= mapper.Map<List<RecetaDto>>(recetaRepository.GetRecetas());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(recetas); 
        }

        [HttpGet("{RecetaId}")]
        [ProducesResponseType(200, Type = typeof(Receta))]
        [ProducesResponseType(400)]
        public IActionResult GetReceta(int RecetaId)
        {
            if(!recetaRepository.RecetaExist(RecetaId))
                return NotFound();
            var receta= mapper.Map<RecetaDto> (recetaRepository.GetReceta(RecetaId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(receta);
        }
    }
}
