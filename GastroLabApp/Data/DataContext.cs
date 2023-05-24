using GastroLabApp.Models;
using Microsoft.EntityFrameworkCore;
namespace GastroLabApp.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
        
        }
        public DbSet<Ingrediente> Ingredientes { get; set; }
        public DbSet<Receta> Recetas { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Opinion> Opiniones { get; set; }
        public DbSet<RecetaIngrediente> RecetasIngredientes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RecetaIngrediente>()
                .HasKey(ri => new { ri.RecetaId, ri.IngredienteId });
            modelBuilder.Entity<RecetaIngrediente>()
                .HasOne(r => r.Receta)
                .WithMany(ri => ri.IngredientesReceta)
                .HasForeignKey(i => i.RecetaId);
            modelBuilder.Entity<RecetaIngrediente>()
                .HasOne(i => i.Ingrediente)
                .WithMany(ri => ri.RecetasIngrediente)
                .HasForeignKey(r => r.IngredienteId);
        }
    }
}
