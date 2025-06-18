'use client';

import { api, toggleTodo } from "@/api/axios";
import { Loading } from "@/components/loading";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Circle, CircleCheck, Edit, LucideTrash2, RefreshCw } from "lucide-react"

interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await api.get('/todos');
      return response.data;
    }
  });

  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      // Invalida e refaz a query para atualizar os dados
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Erro ao alternar tarefa:', error);
      // Aqui você pode adicionar um toast ou notificação de erro
    },
  });

  const handleToggleTodo = (id: string) => {
    toggleMutation.mutate(id);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  console.log(data);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <div className="flex w-96 flex-col shadow-2xl space-y-1 rounded-[20px] border p-1">
        {/* Header */}
        <div className="flex flex-col space-y-4 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold">TODO.</h1>
          <div className="flex flex-col text-zinc-950">
            <p className="text-3xl font-code font- font-bold">{data.filter((task: ITask) => task.completed).length}/{data.length}</p>
            <div className="flex items-center space-x-2 text-sm">
              <RefreshCw className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-zinc-500">Progress of your activities.</span>
            </div>
          </div>
          <button className="bg-zinc-950 p-3 rounded-lg text-white cursor-pointer">Add new task</button>
        </div>
        {/* Task Open */}
        <div className="flex flex-col space-y-1 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold mb-4">OPEN</h1>
          {data.filter((task: ITask) => !task.completed).map((task: ITask) => (
            <div key={task.id} className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-50">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleToggleTodo(task.id)}
                  disabled={toggleMutation.isPending}
                  className="group flex items-center justify-center cursor-pointer bg-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Circle className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 bg-white rounded-full transition-colors" />
                </button>
                <p className="text-zinc-950 text-xs">{task.title}</p>
              </div>
              <div className=" flex items-center justify-center gap-0.5">
                <button className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200">
                  <Edit className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </button>
                <button className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200">
                  <LucideTrash2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Task Close */}
        <div className="flex flex-col space-y-1 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold mb-4">CLOSE</h1>
          {data.filter((task: ITask) => task.completed).map((task: ITask) => (
          <div key={task.id} className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-50">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleToggleTodo(task.id)}
                disabled={toggleMutation.isPending}
                className="flex items-center justify-center cursor-pointer bg-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CircleCheck className="w-5 h-5 text-zinc-400 hover:text-zinc-950 bg-white rounded-full" />
              </button>
              <p className="text-zinc-400 line-through text-xs">{task.title}</p>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <button className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200">
                <LucideTrash2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
