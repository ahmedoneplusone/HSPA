using HSPA_API.Interfaces;
using HSPA_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HSPA_API.Data.Repo
{
    public class CityRepository : ICityRepository
    {
        private readonly HSPA_DBContext dc;

        public CityRepository(HSPA_DBContext dc)
        {
            this.dc = dc;
        }
        public void AddCity(City city)
        {
            dc.Cities.AddAsync(city);
        }

        public async void DeleteCity(int CityID)
        {
            var city = await dc.Cities.FindAsync(CityID);
            dc.Cities.Remove(city);
        }

        public async Task<City> FindCity(int CityID)
        {
            return await dc.Cities.FindAsync(CityID);
        }

        public async Task<IEnumerable<City>> GetCitiesAsync()
        {
            return await dc.Cities.ToListAsync();
        }

       
    }
}
