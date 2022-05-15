using HSPA_API.Interfaces;
using HSPA_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace HSPA_API.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly HSPA_DBContext dc;

        public UserRepository(HSPA_DBContext dc)
        {
            this.dc = dc;
        }
        public async Task<User> Authenticate(string username, string passwordText)
        {
            var user = await dc.Users.FirstOrDefaultAsync(x=>x.Username == username);
            if(user == null || user.Passwordkey == null)
            {
                return null;
            }
            if (!MatchPasswordHash(passwordText, user.Password, user.Passwordkey))
            {
                return null;
            }
            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordkey)
        {
            using (var hmac = new HMACSHA512(passwordkey))
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for(int i=0; i < passwordHash.Length; i++)
                {
                    if(passwordHash[i]!= password[i])
                        return false;
                }
                return true;
            }
        }

        void IUserRepository.Register(string username, string password)
        {
            byte[] passwordHash, passwordKey;
            using (var hmac = new HMACSHA512())
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            User user = new User();
            user.Username = username;
            user.Password = passwordHash;
            user.Passwordkey = passwordKey;
            dc.Users.Add(user);
        }

        async Task<bool> IUserRepository.UserAlreadyExists(string username)
        {
            return await dc.Users.AnyAsync(x => x.Username == username);
        }
    }
}
