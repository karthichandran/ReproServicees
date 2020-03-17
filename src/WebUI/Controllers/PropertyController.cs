using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using ReProServices.Application.Property.Queries;
using ReProServices.Application.Property.Commands.UpdateProperty;
using ReProServices.Application.Property.Commands;

namespace ReProServices.WebUI.Controllers
{
    [Authorize]
    public class PropertyController : ApiController
    {
        [HttpGet]
        public async Task<IList<PropertyDto>> Get()
        {
            return await Mediator.Send(new GetPropertiesQuery());
        }

        //[HttpGet("{id}")]
        //public async Task<PropertyDto> GetById(int id)
        //{
        //    return await Mediator.Send(new GetSellersByIdQuery { SellerID = id });
        //}

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePropertyCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(long id, UpdatePropertyCommand command)
        {
            if (id != command.PropertyDto.PropertyID)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }
    }
}
