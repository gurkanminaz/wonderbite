using Microsoft.EntityFrameworkCore;
using WonderBite.DAL.Models;

namespace WonderBite.DAL
{
    public class WonderBiteDBContext : DbContext
    {
        public WonderBiteDBContext(DbContextOptions<WonderBiteDBContext> options)
            : base(options)
        { }

        public DbSet<FoodEntry> FoodEntries { get; set; }
    }
}
