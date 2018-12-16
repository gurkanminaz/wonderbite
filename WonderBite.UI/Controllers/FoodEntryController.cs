using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WonderBite.DAL;
using WonderBite.DAL.Models;
using WonderBite.UI.Models;

namespace WonderBite.UI.Controllers
{
    [Route("api/[controller]")]
    public class FoodEntryController : Controller
    {
        private readonly WonderBiteDBContext _context;

        public FoodEntryController(WonderBiteDBContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public IEnumerable<FoodEntry> GetAll()
        {
            var foodEntries = _context.FoodEntries.AsEnumerable();

            return foodEntries;
        }

        [HttpPost("[action]")]
        public object Create([FromBody]CreateFoodEntryVM model)
        {
            if (model != null && model.food != "" && model.place != "" && model.price > 0)
            {
                _context.FoodEntries.Add(new FoodEntry()
                {
                    Place = model.place,
                    Food = model.food,
                    Price = model.price
                });
                var count = _context.SaveChanges();
                return new { Message = "success" };
            }
            return new { Message = "failed", model };
        }

    }
}