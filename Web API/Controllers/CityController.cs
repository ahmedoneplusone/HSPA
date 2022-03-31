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
        private readonly IMain main;

        private readonly IMapper mapper;

        public CityController(IMain main,IMapper mapper)
        {
            this.main = main;
            this.mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetCities()
        {
            var Cities = await main.CityRepository.GetCitiesAsync();

            var citiesDto = mapper.Map<IEnumerable<CityDto>>(Cities);

            return Ok(citiesDto);
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {

            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;

            main.CityRepository.AddCity(city);
            await main.SaveAsync();
            return StatusCode(201);
        }

        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCityName(int id, CityUpdateDto cityDto)
        {
            var cityFromDB = await main.CityRepository.FindCity(id);
            cityFromDB.LastUpdatedBy = 1;
            cityFromDB.LastUpdatedOn = DateTime.Now;

            mapper.Map(cityDto, cityFromDB);
            await main.SaveAsync();
            return StatusCode(200);

        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id,CityDto cityDto)
        {
                if (id != cityDto.CityID)
                    return BadRequest("Couldn't Update");

                var cityFromDB = await main.CityRepository.FindCity(id);

                if (cityFromDB == null)
                    return BadRequest("Couldn't Update");

                cityFromDB.LastUpdatedBy = 1;
                cityFromDB.LastUpdatedOn = DateTime.Now;

                mapper.Map(cityDto, cityFromDB);

                await main.SaveAsync();
                return StatusCode(200);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            main.CityRepository.DeleteCity(id);
            await main.SaveAsync();
            return Ok(id);
        }



    }
}
