import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, createTodo, updateTodo, toggleTodo, deleteTodo } from "@/api/axios";
import { CreateTaskData, UpdateTaskData } from "@/types/todo";

export const useTodos = () => {
  const queryClient = useQueryClient();

  // Query to fetch tasks
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  // Mutation to create task
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error creating task:', error);
    },
  });

  // Mutation to update task
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) => {
      return updateTodo(id, data);
    },
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(['todos'], (oldTodos: any[]) => {
        return oldTodos.map(todo => 
          todo.id === updatedTodo.id 
            ? { ...todo, title: updatedTodo.title }
            : todo
        );
      });
    },
    onError: (error) => {
      console.error('Error updating task:', error);
    },
  });

  // Mutation to toggle task status
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: (toggledTodo) => {
      // Update cache with the returned data
      queryClient.setQueryData(['todos'], (oldTodos: any[]) => {
        return oldTodos.map(todo => 
          todo.id === toggledTodo.id 
            ? { ...todo, completed: toggledTodo.completed }
            : todo
        );
      });
    },
    onError: (error) => {
      console.error('Error toggling task:', error);
    },
  });

  // Mutation to delete task
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
    onError: (error) => {
      console.error('Error deleting task:', error);
    },
  });

  // Action functions
  const handleCreateTodo = (data: CreateTaskData) => {
    createMutation.mutate(data);
  };

  const handleUpdateTodo = (id: string, data: UpdateTaskData) => {
    updateMutation.mutate({ id, data });
  };

  const handleToggleTodo = (id: string) => {
    toggleMutation.mutate(id);
  };

  const handleDeleteTodo = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Check if any operation is pending
  const isPending = createMutation.isPending || updateMutation.isPending || 
                   toggleMutation.isPending || deleteMutation.isPending;

  return {
    todos,
    isLoading,
    error,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
    isPending,
  };
}; 