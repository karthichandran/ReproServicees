using MediatR;
using ReProServices.Application.Common.Interfaces;
using ReProServices.Application.Property.Queries;
using System.Threading.Tasks;
using System.Threading;
using ReProServices.Domain.Entities;

namespace ReProServices.Application.Property.Commands
{
    public class CreatePropertyCommand : IRequest<int>
    {
       public PropertyDto PropertyDto { get; set; }

        public class CreatePropertyCommandHandler : IRequestHandler<CreatePropertyCommand, int>
        {
            private readonly IApplicationDbContext _context;
            public CreatePropertyCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreatePropertyCommand request, CancellationToken cancellationToken)
            {
                var propertyObj = request.PropertyDto;
                Domain.Entities.Property property = new Domain.Entities.Property
                {
                    PropertyType = propertyObj.PropertyType,
                    AddressPremises = propertyObj.AddressPremises,
                    AddressLine1 = propertyObj.AddressLine1,
                    AddressLine2 = propertyObj.AddressLine2,
                    City = propertyObj.City,
                    PinCode = propertyObj.PinCode,
                    LateFeeDay = propertyObj.LateFeeDay,
                    TdsInterestRate=propertyObj.TdsInterestRate,
                    StateID = propertyObj.StateID,
                    GstTaxCode = propertyObj.GstTaxCode,
                    TDSTaxCode = propertyObj.TDSTaxCode                             

        };

                _context.Property.Add(property);
                await _context.SaveChangesAsync(cancellationToken);
                return property.PropertyID;

            }
        }

    }
}
