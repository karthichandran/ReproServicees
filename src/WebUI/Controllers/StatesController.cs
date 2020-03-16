using ReProServices.Application.States.Queries.GetStates;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReProServices.WebUI.Controllers
{
    [Authorize]
    public class StatesController : ApiController
    
    {
        [HttpGet]
        public async Task<IList<StateDto>> Get()
        {
            return await Mediator.Send(new GetStatesQuery());
        }
    }
}
