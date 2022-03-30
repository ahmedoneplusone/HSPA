namespace HSPA_API.Interfaces
{
    public interface IMain
    {
        ICityRepository CityRepository { get; }
        Task<bool> SaveAsync();
    }
}
