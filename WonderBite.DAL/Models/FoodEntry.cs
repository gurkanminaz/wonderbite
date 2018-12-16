using System.ComponentModel.DataAnnotations;

namespace WonderBite.DAL.Models
{
    public class FoodEntry
    {
        [Key]
        public int Id { get; set; }
        public string Place { get; set; }
        public string Food { get; set; }
        public decimal Price { get; set; }
    }
}
