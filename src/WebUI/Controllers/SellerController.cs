using ReProServices.Application.Sellers.Commands;
using ReProServices.Application.Sellers.Queries.GetSellers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace ReProServices.WebUI.Controllers
{
    [Authorize]
    public class SellerController : ApiController
    {
        [HttpGet]
        public async Task<IList<SellerDto>> Get()
        {
            return await Mediator.Send(new GetSellersQuery());
        }

        [HttpGet("{id}")]
        public async Task<SellerDto> GetById(int id)
        {
            return await Mediator.Send(new GetSellersByIdQuery { SellerID = id });
        }

        //[HttpPost]
        //public async Task<ActionResult<long>> Create(CreateTodoItemCommand command)
        //{
        //    return await Mediator.Send(command);
        //}

        //[HttpPut("{id}")]
        //public async Task<ActionResult> Update(long id, UpdateTodoItemCommand command)
        //{
        //    if (id != command.Id)
        //    {
        //        return BadRequest();
        //    }

        //    await Mediator.Send(command);

        //    return NoContent();
        //}

        //[HttpPut("[action]")]
        //public async Task<ActionResult> UpdateItemDetails(long id, UpdateTodoItemDetailCommand command)
        //{
        //    if (id != command.Id)
        //    {
        //        return BadRequest();
        //    }

        //    await Mediator.Send(command);

        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(long id)
        //{
        //    await Mediator.Send(new DeleteTodoItemCommand { Id = id });

        //    return NoContent();
        //}
    }
}
