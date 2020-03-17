using ReProServices.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace ReProServices.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }

        DbSet<Seller> Seller { get; set; }

        DbSet<Domain.Entities.States> StateList { get; set; }

        DbSet<Domain.Entities.Property> Property { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
