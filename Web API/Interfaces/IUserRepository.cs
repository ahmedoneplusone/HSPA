using HSPA_API.Models;

namespace HSPA_API.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string username, string password);

    }
}
