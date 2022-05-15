using System.ComponentModel.DataAnnotations;

namespace HSPA_API.Dtos
{
    public class CityDto
    {
        public int CityID { get; set; }
        [Required (ErrorMessage = "Name is a mandatory field")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-z]+.*",ErrorMessage ="Can't enter a numeric value")]
        public String Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}
