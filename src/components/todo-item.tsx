import { memo } from "react";
import { Circle, CircleCheck, Edit, LucideTrash2 } from "lucide-react";
import { ITask, UpdateTaskData } from "@/types/todo";

interface TodoItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onEdit: (id: string, data: UpdateTaskData) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
}

export const TodoItem = memo(({ task, onToggle, onEdit, onDelete, isPending }: TodoItemProps) => {
  const handleEdit = () => {
    const newTitle = prompt("Editar tarefa:", task.title);
    if (newTitle && newTitle.trim() !== task.title) {
      onEdit(task.id, { title: newTitle.trim() });
    }
  };

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
      onDelete(task.id);
    }
  };

  return (
    <div className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-50">
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => onToggle(task.id)}
          disabled={isPending}
          className="group flex items-center justify-center cursor-pointer bg-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {task.completed ? (
            <CircleCheck className="w-5 h-5 text-zinc-400 hover:text-zinc-950 bg-white rounded-full transition-colors" />
          ) : (
            <Circle className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 bg-white rounded-full transition-colors" />
          )}
        </button>
        <p className={`text-xs ${task.completed ? 'text-zinc-400 line-through' : 'text-zinc-950'}`}>
          {task.title}
        </p>
      </div>
      <div className="flex items-center justify-center gap-0.5">
        <button 
          onClick={handleEdit}
          disabled={isPending}
          className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Edit className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
        </button>
        <button 
          onClick={handleDelete}
          disabled={isPending}
          className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LucideTrash2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
        </button>
      </div>
    </div>
  );
});

TodoItem.displayName = 'TodoItem'; 