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
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepository usuarioRepository;
        private readonly IMapper mapper;

        public UsuarioController(IUsuarioRepository usuarioRepository, IMapper mapper)
        {
            this.usuarioRepository = usuarioRepository;
            this.mapper = mapper;
        }
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Usuario>))]
        public IActionResult GetUsuarios()
        {
            var usuarios =mapper.Map<List<UsuarioDto>>(usuarioRepository.GetUsuarios());
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(usuarios);
        }

        [HttpGet("{UsuarioId}")]
        [ProducesResponseType(200, Type = typeof(Usuario))]
        [ProducesResponseType(400)]
        public IActionResult GetUsuario(int UsuarioId)
        {
            if (!usuarioRepository.UsuarioExist(UsuarioId))
                return NotFound();
            var usuario = mapper.Map<UsuarioDto>(usuarioRepository.GetUsuario(UsuarioId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(usuario);
        }

        [HttpPut("{UsuarioId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]

        public IActionResult UpdateReceta(int UsuarioId, [FromBody] UsuarioDto updatedUsuario)
        {
            if (updatedUsuario == null)
                return BadRequest(ModelState);
            if (UsuarioId != updatedUsuario.Id)
                return BadRequest(ModelState);
            if (!usuarioRepository.UsuarioExist(UsuarioId))
                return NotFound();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var usuarioMap = mapper.Map<Usuario>(updatedUsuario);
            if (!usuarioRepository.UpdateUsuario(usuarioMap))
            {
                ModelState.AddModelError("", "Algo a ido mal updateando el usuario");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public IActionResult CreateUsuario([FromBody] UsuarioDto usuarioCreate)
        {
            if (usuarioCreate == null)
                return BadRequest(ModelState);
            var usuarios = usuarioRepository.GetUsuarios().Where(r => r.Nombre.Trim().ToUpper() == usuarioCreate.Nombre.TrimEnd().ToUpper()).FirstOrDefault();
            if (usuarios != null)
            {
                ModelState.AddModelError("", "El nombre de este usuario ya existe");
                return StatusCode(422, ModelState);
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var usuarioMap = mapper.Map<Usuario>(usuarioCreate);
            if (!usuarioRepository.CreateUsuario(usuarioMap))
            {
                ModelState.AddModelError("", "Algo ha salido mal en la creacion del usuario");
                return StatusCode(500, ModelState);
            }
            return Ok("El usuario ha sido creada correctamente");
        }

        [HttpGet("obtenerUsuarios")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Usuario>))]
        public IActionResult ObtenerUsuarios([FromQuery] List<int> usuariosIds)
        {
            var usuarios = usuarioRepository.GetUsuarios().Where(u => usuariosIds.Contains(u.Id)).ToList();
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(usuarios);
        }

    }
}