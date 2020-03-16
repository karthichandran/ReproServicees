using FluentValidation;

namespace ReProServices.Application.Sellers.Commands.CreateSeller
{
    public class CreateSellerCommandValidator : AbstractValidator<CreateSellerCommand>
    {
        public CreateSellerCommandValidator()
        {
            RuleFor(s => s.sellerDto.PAN)
           .Length(10)
           .NotEmpty();
        }
    }
}
