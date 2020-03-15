using ReProServices.Application.WeatherForecasts.Queries.GetWeatherForecasts;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using ReProServices.Application.Sellers.Queries.GetSellers;

namespace ReProServices.WebUI.Controllers
{
    public class WeatherForecastController : ApiController
    {
        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var demos = await Mediator.Send(new GetSellersQuery());
            var demo = await Mediator.Send(new GetSellersByIdQuery { SellerID = 3});
            return await Mediator.Send(new GetWeatherForecastsQuery());
        }
    }
}
