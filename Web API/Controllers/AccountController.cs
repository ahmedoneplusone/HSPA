using HSPA_API.Dtos;
using HSPA_API.Interfaces;
using HSPA_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace HSPA_API.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IMain main;
        private readonly IConfiguration configuration;

        public AccountController(IMain main,IConfiguration configuration)
        {
            this.main = main;
            this.configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginReqDto loginReq)
        {
            var user = await main.UserRepository.Authenticate(loginReq.Username, loginReq.Password);
            if(user == null)
            {
                return Unauthorized();
            }

            var loginres = new LoginResDto();
            loginres.Username = user.Username;
            loginres.Token = CreateJWT(user);
            
            return Ok(loginres);
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(LoginReqDto loginReq)
        { 
            if(await main.UserRepository.UserAlreadyExists(loginReq.Username))
            {
                return BadRequest("User already exists");
            }
            main.UserRepository.Register(loginReq.Username, loginReq.Password);
            await main.SaveAsync();
            return StatusCode(201);
        }

            private string CreateJWT(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Key").Value));

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };

            var signingCredentials = new SigningCredentials(
                key, SecurityAlgorithms.HmacSha256Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
