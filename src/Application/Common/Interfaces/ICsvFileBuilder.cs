using ReProServices.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace ReProServices.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
