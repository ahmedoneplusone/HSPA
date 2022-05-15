using System.ComponentModel.DataAnnotations;

namespace HSPA_API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }
        public byte[] Passwordkey { get; set; }

    }
}
