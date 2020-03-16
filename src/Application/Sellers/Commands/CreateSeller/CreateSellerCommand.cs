using MediatR;
using ReProServices.Application.Common.Interfaces;
using ReProServices.Application.Sellers.Queries.GetSellers;
using System.Threading.Tasks;
using System.Threading;
using ReProServices.Domain.Entities;

namespace ReProServices.Application.Sellers.Commands.CreateSeller
{
    public class CreateSellerCommand : IRequest<int>
    {
        public SellerDto sellerDto { get; set; }

        public class CreateSellerCommandHandler : IRequestHandler<CreateSellerCommand, int>
        {
            private readonly IApplicationDbContext _context;
            public CreateSellerCommandHandler(IApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<int> Handle(CreateSellerCommand request, CancellationToken cancellationToken)
            {
                var sellerObj = request.sellerDto;
                Seller seller = new Seller
                {
                    AdressLine1 = sellerObj.AdressLine1,
                    AddressLine2 = sellerObj.AddressLine2,
                    AddressPremises = sellerObj.AddressPremises,
                    City = sellerObj.City,
                    EmailID = sellerObj.EmailID,
                    MobileNo = sellerObj.MobileNo,
                    PAN = sellerObj.PAN,
                    PinCode = sellerObj.PinCode,
                    SellerName = sellerObj.SellerName,
                    StateID = sellerObj.StateID
                };

                _context.Seller.Add(seller);
                await _context.SaveChangesAsync(cancellationToken);
                return seller.SellerID;

            }
        }
        

    }
}
