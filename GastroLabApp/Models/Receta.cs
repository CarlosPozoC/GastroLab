﻿namespace GastroLabApp.Models
{
    public class Receta
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Tipo { get; set; }
        public ICollection<RecetaIngrediente> IngredientesReceta { get; set; }
        public Usuario Usuario { get; set; }

    }
}