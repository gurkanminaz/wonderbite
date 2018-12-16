using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WonderBite.DAL;
using WonderBite.UI.Models;

namespace WonderBite.UI.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly WonderBiteDBContext _context;

        public AccountController(WonderBiteDBContext context)
        {
            _context = context;
        }

        [HttpPost("[action]")]
        public object Login([FromBody]LoginVM model)
        {
            if (model != null && model.email != "" && model.password != "")
            {
                return new { Message = "success", model };
            }
            return new { Message = "failed", model };
        }
    }
}