﻿namespace GastroLabApp.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Contraseña { get; set; }
        public string Sexo { get; set; }
        public ICollection<Receta> Recetas { get; set; }
    }
}
