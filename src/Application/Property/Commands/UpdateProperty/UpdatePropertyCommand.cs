using MediatR;
using ReProServices.Application.Common.Interfaces;
using ReProServices.Application.Property.Queries;
using System.Threading.Tasks;
using System.Threading;
using ReProServices.Domain.Entities;
using ReProServices.Application.Common.Exceptions;

namespace ReProServices.Application.Property.Commands.UpdateProperty
{
    public class UpdatePropertyCommand:  IRequest<int>
    {
       public PropertyDto PropertyDto { get; set; }
        public class UpdatePropertyCommandHandler : IRequestHandler<UpdatePropertyCommand, int>
        {
            private readonly IApplicationDbContext _context;
            public UpdatePropertyCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(UpdatePropertyCommand request, CancellationToken cancellationToken)
            {
                var entity = await _context.Property.FindAsync(request.PropertyDto.PropertyID);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Property), request.PropertyDto.PropertyID);
                }

                var propertyObj = request.PropertyDto;
                entity.PropertyType = propertyObj.PropertyType;
                entity.AddressPremises = propertyObj.AddressPremises;
                entity.AddressLine1 = propertyObj.AddressLine1;
                entity.AddressLine2 = propertyObj.AddressLine2;
                entity.City = propertyObj.City;
                entity.PinCode = propertyObj.PinCode;
                entity.LateFeeDay = propertyObj.LateFeeDay;
                entity.TdsInterestRate = propertyObj.TdsInterestRate;
                entity.StateID = propertyObj.StateID;
                entity.GstTaxCode = propertyObj.GstTaxCode;
                entity.TDSTaxCode = propertyObj.TDSTaxCode;


                await _context.SaveChangesAsync(cancellationToken);
                return entity.PropertyID;

            }
        }
    }
}
