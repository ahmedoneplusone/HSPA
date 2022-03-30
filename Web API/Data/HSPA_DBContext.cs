using HSPA_API.Models;
using Microsoft.EntityFrameworkCore;


namespace HSPA_API.Data
{
    public class HSPA_DBContext : DbContext
    {
        public HSPA_DBContext(DbContextOptions<HSPA_DBContext> options) : base(options)
        {

        }

        public DbSet<City> Cities { get; set; }

    }
}
