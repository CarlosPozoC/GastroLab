using GastroLabApp.Models;
using GastroLabApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using GastroLabApp.Repository;
using AutoMapper;
using GastroLabApp.Dto;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredienteController : Controller
    {
        private readonly IIngredienteRepository ingredienteRepository;
        private readonly IMapper mapper;
        public IngredienteController(IIngredienteRepository ingredienteRepository, IMapper mapper)
        {
            this.ingredienteRepository = ingredienteRepository;
            this.mapper = mapper;   
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ingrediente>))]
        public IActionResult GetIngredientes()
        {
            var ingredientes = ingredienteRepository.GetIngredientes();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(ingredientes);
        }

        [HttpGet("{IngredienteId}")]
        [ProducesResponseType(200, Type = typeof(Ingrediente))]
        [ProducesResponseType(400)]
        public IActionResult GetIngrediente(int IngredienteId)
        {
            if (!ingredienteRepository.IngredienteExist(IngredienteId))
                return NotFound();
            var ingrediente = mapper.Map<IngredienteDto>(ingredienteRepository.GetIngrediente(IngredienteId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(ingrediente);
        }

        [HttpPut("{IngredienteId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateIngrediente(int IngredienteId, [FromBody] IngredienteDto updatedIngrediente)
        {
            if (updatedIngrediente == null)
                return BadRequest(ModelState);
            if (IngredienteId != updatedIngrediente.Id)
                return BadRequest(ModelState);
            if (!ingredienteRepository.IngredienteExist(IngredienteId))
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var ingredienteMap = mapper.Map<Ingrediente>(updatedIngrediente);
            if (!ingredienteRepository.UpdateIngrediente(ingredienteMap))
            {
                ModelState.AddModelError("", "Algo a ido mal updateando el ingrediente");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public IActionResult CreateIngrediente([FromBody] IngredienteDto ingredienteCreate)
        {
            if (ingredienteCreate == null)
                return BadRequest(ModelState);
            var ingredientes = ingredienteRepository.GetIngredientes().Where(r => r.Nombre.Trim().ToUpper() == ingredienteCreate.Nombre.TrimEnd().ToUpper()).FirstOrDefault();
            if (ingredientes != null)
            {
                ModelState.AddModelError("", "El nombre de este ingrediente ya existe");
                return StatusCode(422, ModelState);
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var ingredienteMap = mapper.Map<Ingrediente>(ingredienteCreate);
            if (!ingredienteRepository.CreateIngrediente(ingredienteMap))
            {
                ModelState.AddModelError("", "Algo ha salido mal en la creacion del ingrediente");
                return StatusCode(500, ModelState);
            }
            return Ok("El ingrediente ha sido creada correctamente");
        }

        [HttpDelete("{IngredienteId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteIngrediente(int IngredienteId)
        {
            if (!ingredienteRepository.IngredienteExist(IngredienteId))
                return NotFound();
            var IngredienteABorrar = ingredienteRepository.GetIngrediente(IngredienteId);
            if (!ingredienteRepository.DeleteIngrediente(IngredienteABorrar))
            {
                ModelState.AddModelError("", "Algo a ido mal borrando el ingrediente");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}