using AutoMapper;
using HSPA_API.Dtos;
using HSPA_API.Interfaces;
using HSPA_API.Models;
using Microsoft.AspNetCore.Mvc;
 
namespace HSPA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IMain repo;

        private readonly IMapper mapper;

        public CityController(IMain repo,IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var Cities = await repo.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(Cities);

            return Ok(citiesDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            //var city = new City { 
            //Name = cityDto.Name,
            //LastUpdatedBy = 1,
            //LastUpdatedOn = DateTime.Now
            //};

            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            repo.CityRepository.AddCity(city);
            await repo.SaveAsync();
            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            repo.CityRepository.DeleteCity(id);
            await repo.SaveAsync();
            return Ok(id);
        }



    }
}
