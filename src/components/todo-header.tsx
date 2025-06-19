import { RefreshCw } from "lucide-react";
import { ITask } from "@/types/todo";

interface TodoHeaderProps {
  todos: ITask[];
  onAddNewTask: () => void;
}

export const TodoHeader = ({ todos, onAddNewTask }: TodoHeaderProps) => {
  const completedCount = todos.filter(task => task.completed).length;
  const totalCount = todos.length;

  return (
    <div className="flex flex-col space-y-4 border bg-white p-4 rounded-2xl max-w-md w-full">
      <h1 className="text-zinc-500 text-xs font-semibold">TODO.</h1>
      <div className="flex flex-col text-zinc-950">
        <p className="text-3xl font-code font-bold">{completedCount}/{totalCount}</p>
        <div className="flex items-center space-x-2 text-sm">
          <RefreshCw className="w-4 h-4 text-orange-500" />
          <span className="text-sm text-zinc-500">Progress of your activities.</span>
        </div>
      </div>
      <button 
        onClick={onAddNewTask}
        className="bg-zinc-950 p-3 rounded-xl text-white cursor-pointer hover:bg-zinc-800 transition-colors"
      >
        Add new task
      </button>
    </div>
  );
}; 