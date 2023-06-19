using GastroLabApp.Models;
using GastroLabApp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using GastroLabApp.Dto;
using System.Collections.Generic;
using GastroLabApp.Repository;

namespace GastroLabApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValoracionController:Controller
    {
        private readonly IValoracionRepository valoracionRepository;
        private readonly IUsuarioRepository usuarioRepository;
        private readonly IRecetaRepository recetaRepository;
        private readonly IMapper mapper;
        public ValoracionController(IValoracionRepository valoracionRepository,IRecetaRepository recetaRepository, IUsuarioRepository usuarioRepository, IMapper mapper)
        {
            this.valoracionRepository = valoracionRepository;
            this.recetaRepository = recetaRepository;
            this.usuarioRepository = usuarioRepository;
            this.mapper = mapper;
        }
        [HttpPost]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        public IActionResult CreateValoracion([FromQuery] int RecetaId, [FromQuery] int UsuarioId, [FromBody] ValoracionDto valoracionCreate)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var valoracionMap = mapper.Map<Valoracion>(valoracionCreate);
            valoracionMap.usuario = usuarioRepository.GetUsuario(UsuarioId);
            valoracionMap.receta = recetaRepository.GetReceta(RecetaId);
            if (!valoracionRepository.CreateValoracion(valoracionMap))
            {
                ModelState.AddModelError("", "Algo ha salido mal en la creacion de la opinion");
                return StatusCode(500, ModelState);
            }
            return Ok("La opinion ha sido creada correctamente");
        }

        [HttpGet("{RecetaId}")]
        [ProducesResponseType(200, Type = typeof(int))]
        [ProducesResponseType(400)]
        public IActionResult GetValoraciones(int RecetaId)
        {
            if (!recetaRepository.RecetaExist(RecetaId))
                return NotFound();
            int valorMedio = (valoracionRepository.GetValoraciones(RecetaId));
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            return Ok(valorMedio);
        }
    }
}
