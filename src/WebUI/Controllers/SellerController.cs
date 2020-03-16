using ReProServices.Application.Sellers.Queries.GetSellers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using System.Collections.Generic;
using ReProServices.Application.Sellers.Commands.UpdateSeller;
using ReProServices.Application.Sellers.Commands.CreateSeller;

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

        [HttpPost]
        public async Task<ActionResult<int>> Create( CreateSellerCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(long id, UpdateSellerCommand command)
        {
            if (id != command.sellerDto.SellerID)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        //[HttpDelete("{id}")]
        //public async Task<ActionResult> Delete(long id)
        //{
        //    await Mediator.Send(new DeleteTodoItemCommand { Id = id });

        //    return NoContent();
        //}
    }
}
