using AutoMapper;
using HSPA_API.Dtos;
using HSPA_API.Models;

namespace HSPA_API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<City, CityDto>().ReverseMap();
        }
    }
}
