using ReProServices.Application.Common.Mappings;
using ReProServices.Domain.Entities;

namespace ReProServices.Application.TodoLists.Queries.ExportTodos
{
    public class TodoItemRecord : IMapFrom<TodoItem>
    {
        public string Title { get; set; }

        public bool Done { get; set; }
    }
}
