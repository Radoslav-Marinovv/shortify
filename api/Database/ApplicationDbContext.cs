using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Link> Links { get; set; }
    }
}
