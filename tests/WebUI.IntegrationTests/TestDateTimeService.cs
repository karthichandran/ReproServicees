using ReProServices.Application.Common.Interfaces;
using System;

namespace ReProServices.WebUI.IntegrationTests
{
    public class TestDateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
