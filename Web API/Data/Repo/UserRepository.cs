using HSPA_API.Interfaces;
using HSPA_API.Models;
using Microsoft.EntityFrameworkCore;

namespace HSPA_API.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly HSPA_DBContext dc;

        public UserRepository(HSPA_DBContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string username, string password)
        {
            return await dc.Users.FirstOrDefaultAsync(x=>x.Username == username && x.Password == password);
        }
    }
}
