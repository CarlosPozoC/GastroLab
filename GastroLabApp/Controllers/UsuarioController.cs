using GastroLabApp.Models;
using GastroLabApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using GastroLabApp.Repository;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepository usuarioRepository;

        public UsuarioController(IUsuarioRepository usuarioRepository)
        {
            this.usuarioRepository = usuarioRepository;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Usuario>))]
        public IActionResult GetUsuarios()
        {
            var usuarios = usuarioRepository.GetUsuarios();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(usuarios);
        }
    }
}