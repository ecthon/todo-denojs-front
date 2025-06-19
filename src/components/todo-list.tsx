import { memo } from "react";
import { ITask, TaskActions } from "@/types/todo";
import { TodoItem } from "./todo-item";

interface TodoListProps {
  title: string;
  tasks: ITask[];
  actions: TaskActions;
}

export const TodoList = memo(({ title, tasks, actions }: TodoListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col space-y-1 border bg-white p-4 rounded-2xl max-w-md w-full">
        <h1 className="text-zinc-500 text-xs font-semibold mb-4">{title}</h1>
        <div className="text-center py-4 text-zinc-400 text-sm">
          No {title.toLowerCase()} tasks.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-1 border bg-white p-4 rounded-2xl max-w-md w-full">
      <h1 className="text-zinc-500 text-xs font-semibold mb-4">{title}</h1>
      <div className="space-y-1">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={actions.onToggle}
            onEdit={actions.onEdit}
            onDelete={actions.onDelete}
            isPending={actions.isPending}
          />
        ))}
      </div>
    </div>
  );
});

TodoList.displayName = 'TodoList'; 