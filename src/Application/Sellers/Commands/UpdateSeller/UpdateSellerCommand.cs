using MediatR;
using ReProServices.Application.Common.Interfaces;
using ReProServices.Application.Sellers.Queries.GetSellers;
using System.Threading.Tasks;
using System.Threading;
using ReProServices.Domain.Entities;
using ReProServices.Application.Common.Exceptions;

namespace ReProServices.Application.Sellers.Commands.UpdateSeller
{
    public class UpdateSellerCommand : IRequest<int>
    {
        public SellerDto sellerDto { get; set; }

        public class UpdateSellerCommandHandler : IRequestHandler<UpdateSellerCommand, int>
        {
            private readonly IApplicationDbContext _context;
            public UpdateSellerCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(UpdateSellerCommand request, CancellationToken cancellationToken)
            {

                var entity = await _context.Seller.FindAsync(request.sellerDto.SellerID);

                if (entity == null)
                {
                    throw new NotFoundException(nameof(Seller), request.sellerDto.SellerID);
                }
                var sellerObj = request.sellerDto;
                entity.AdressLine1 = sellerObj.AdressLine1;
                entity.AddressLine2 = sellerObj.AddressLine2;
                entity.AddressPremises = sellerObj.AddressPremises;
                entity.City = sellerObj.City;
                entity.EmailID = sellerObj.EmailID;
                entity.MobileNo = sellerObj.MobileNo;
                entity.PAN = sellerObj.PAN;
                entity.PinCode = sellerObj.PinCode;
                entity.SellerName = sellerObj.SellerName;
                entity.StateID = sellerObj.StateID;

                //Seller seller = new Seller
                //{
                //    AdressLine1 = sellerObj.AdressLine1,
                //    AddressLine2 = sellerObj.AddressLine2,
                //    AddressPremises = sellerObj.AddressPremises,
                //    City = sellerObj.City,
                //    EmailID = sellerObj.EmailID,
                //    MobileNo = sellerObj.MobileNo,
                //    PAN = sellerObj.PAN,
                //    PinCode = sellerObj.PinCode,
                //    SellerName = sellerObj.SellerName,
                //    StateID = sellerObj.StateID
                //};

                //_context.Seller.Update(seller);
                //await _context.SaveChangesAsync(cancellationToken);
                //return seller.SellerID;
                await _context.SaveChangesAsync(cancellationToken);
                return entity.SellerID;

            }
        }
    }
}
