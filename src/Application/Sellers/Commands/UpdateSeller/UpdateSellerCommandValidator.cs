using FluentValidation;

namespace ReProServices.Application.Sellers.Commands.UpdateSeller
{
    public class UpdateSellerCommandValidator : AbstractValidator<UpdateSellerCommand>
    {

        public UpdateSellerCommandValidator()
        {
            RuleFor(s => s.sellerDto.PAN)
     .Length(10)
     .NotEmpty();
        }
  
    }
}
