using System.ComponentModel.DataAnnotations;

namespace HSPA_API.Models
{
    public class City
    {
        public int CityID { get; set; }
        public String Name { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime LastUpdatedOn { get; set; }
        public int LastUpdatedBy { get; set; }
    }
}
