'use client';

import { useState, useMemo } from "react";
import { useTodos } from "@/hooks/useTodos";
import { 
  Loading, 
  TodoHeader, 
  TodoList, 
  AddTaskModal, 
  ErrorBoundary 
} from "@/components";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    todos,
    isLoading,
    error,
    handleCreateTodo,
    handleUpdateTodo,
    handleToggleTodo,
    handleDeleteTodo,
    isPending,
  } = useTodos();

  // Memoizar as listas filtradas para evitar recálculos desnecessários
  const openTasks = useMemo(() => 
    todos.filter(task => !task.completed), 
    [todos]
  );
  
  const completedTasks = useMemo(() => 
    todos.filter(task => task.completed), 
    [todos]
  );

  const taskActions = {
    onToggle: handleToggleTodo,
    onEdit: handleUpdateTodo,
    onDelete: handleDeleteTodo,
    isPending,
  };

  const handleAddNewTask = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = (title: string) => {
    handleCreateTodo({ title });
  };

  // Tratamento de erro
  if (error) {
    return (
      <ErrorBoundary 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <div className="flex w-96 flex-col shadow-2xl space-y-1 rounded-[20px] border p-1">
        {/* Header */}
        <TodoHeader 
          todos={todos} 
          onAddNewTask={handleAddNewTask} 
        />
        
        {/* Task Open */}
        <TodoList
          title="OPEN"
          tasks={openTasks}
          actions={taskActions}
        />

        {/* Task Close */}
        <TodoList
          title="CLOSE"
          tasks={completedTasks}
          actions={taskActions}
        />
      </div>

      {/* Modal para adicionar tarefa */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddTask}
        isPending={isPending}
      />
    </div>
  );
}
