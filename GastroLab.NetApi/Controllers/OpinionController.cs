using AutoMapper;
using GastroLabApp.Dto;
using GastroLabApp.Interfaces;
using GastroLabApp.Models;
using GastroLabApp.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpinionController:Controller
    {
        private readonly IRecetaRepository recetaRepository;
        private readonly IOpinionRepository opinionRepository;
        private readonly IUsuarioRepository usuarioRepository;
        private readonly IMapper mapper;

        public OpinionController(IOpinionRepository opinionRepository,IRecetaRepository recetaRepository, IUsuarioRepository usuarioRepository, IMapper mapper)
        {
            this.opinionRepository= opinionRepository;
            this.recetaRepository = recetaRepository;
            this.usuarioRepository = usuarioRepository;
            this.mapper = mapper;
        }

        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public IActionResult CreateOpinion([FromQuery] int RecetaId, [FromQuery] int UsuarioId, [FromBody] OpinionDto opinionCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var opinionMap = mapper.Map<Opinion>(opinionCreate);
            opinionMap.usuario = usuarioRepository.GetUsuario(UsuarioId);
            opinionMap.receta = recetaRepository.GetReceta(RecetaId);
            if (!opinionRepository.CreateOpinion(opinionMap))
            {
                ModelState.AddModelError("", "Algo ha salido mal en la creacion de la opinion");
                return StatusCode(500, ModelState);
            }
            return Ok("La opinion ha sido creada correctamente");
        }

        [HttpDelete("{OpinionId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteOpinion(int OpinionId)
        {
            if (!opinionRepository.OpinionExist(OpinionId))
                return NotFound();
            var OpinionABorrar = opinionRepository.GetOpinion(OpinionId);
            if (!opinionRepository.DeleteOpinion(OpinionABorrar))
            {
                ModelState.AddModelError("", "Algo a ido mal borrando la opinion");
                return StatusCode(500, ModelState);
            }
            return NoContent();
        }
    }
}
