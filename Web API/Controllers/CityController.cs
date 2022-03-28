using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HSPA_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "assd", "asd" };
        }

        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "asd";
        }
    }
}
