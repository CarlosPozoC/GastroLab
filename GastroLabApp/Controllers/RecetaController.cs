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
        private readonly IUsuarioRepository usuarioRepository;
        private readonly IMapper mapper;

        public RecetaController(IRecetaRepository recetaRepository,IUsuarioRepository usuarioRepository, IMapper mapper)
        {
            this.recetaRepository = recetaRepository;
            this.usuarioRepository= usuarioRepository;
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

        [HttpGet("Ingredientes/{RecetaId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ingrediente>))]
        [ProducesResponseType(400)]
        public IActionResult GetIngredientesByReceta(int RecetaId)
        {
            if (!recetaRepository.RecetaExist(RecetaId))
                return NotFound();
            var ingredientes = mapper.Map<List<IngredienteDto>>(recetaRepository.GetIngredientesByReceta(RecetaId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(ingredientes);
        }

        [HttpGet("Opiniones/{RecetaId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Opinion>))]
        [ProducesResponseType(400)]
        public IActionResult GetOpinionesByReceta(int RecetaId)
        {
            if (!recetaRepository.RecetaExist(RecetaId))
                return NotFound();
            var opiniones = mapper.Map<List<OpinionDto>>(recetaRepository.GetOpinionesByReceta(RecetaId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(opiniones);
        }

        [HttpPut("{RecetaId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateReceta(int RecetaId, [FromBody] RecetaDto updatedReceta) 
        {
            if(updatedReceta==null)
                return BadRequest(ModelState);
            if(RecetaId!=updatedReceta.Id)
                return BadRequest(ModelState);
            if(!recetaRepository.RecetaExist(RecetaId))
                return NotFound();  
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var recetaMap = mapper.Map<Receta>(updatedReceta);
            if (!recetaRepository.UpdateReceta(recetaMap))
            {
                ModelState.AddModelError("", "Algo a ido mal updateando la receta");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public IActionResult CreateReceta([FromQuery]int UsuarioId,[FromQuery] List<int> IngredienteId,[FromBody] RecetaDto recetaCreate)
        {
            if(recetaCreate==null)
                return BadRequest(ModelState);
            var recetas = recetaRepository.GetRecetas().Where(r=>r.Nombre.Trim().ToUpper()==recetaCreate.Nombre.TrimEnd().ToUpper()).FirstOrDefault();
            if(recetas!=null)
            {
                ModelState.AddModelError("","El nombre de esta receta ya existe");
                return StatusCode(422, ModelState);
            }
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            var recetaMap=mapper.Map<Receta>(recetaCreate);
            recetaMap.Usuario = usuarioRepository.GetUsuario(UsuarioId);
            if (!recetaRepository.CreateReceta(IngredienteId, recetaMap))
            {
                ModelState.AddModelError("", "Algo ha salido mal en la creacion de la receta");
                return StatusCode(500, ModelState);
            }
            return Ok("La receta ha sido creada correctamente");
        } 
    }
}
