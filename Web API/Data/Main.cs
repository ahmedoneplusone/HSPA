using HSPA_API.Data.Repo;
using HSPA_API.Interfaces;

namespace HSPA_API.Data
{
    public class Main : IMain
    {
        private readonly HSPA_DBContext dc;

        public Main(HSPA_DBContext dc)
        {
            this.dc = dc;
        }
        public ICityRepository CityRepository =>
            new CityRepository(dc);
        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}
