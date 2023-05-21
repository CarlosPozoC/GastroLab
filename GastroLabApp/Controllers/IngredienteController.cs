using GastroLabApp.Models;
using GastroLabApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using GastroLabApp.Repository;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngredienteController : Controller
    {
        private readonly IIngredienteRepository ingredienteRepository;

        public IngredienteController(IIngredienteRepository ingredienteRepository)
        {
            this.ingredienteRepository = ingredienteRepository;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Ingrediente>))]
        public IActionResult GetRecetas()
        {
            var ingredientes = ingredienteRepository.GetIngredientes();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(ingredientes);
        }
    }
}