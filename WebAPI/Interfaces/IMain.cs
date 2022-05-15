namespace HSPA_API.Interfaces
{
    public interface IMain
    {
        ICityRepository CityRepository { get; }
        IUserRepository UserRepository { get; }

        Task<bool> SaveAsync();
    }
}
