import { useState } from "react";
import { X } from "lucide-react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string) => void;
  isPending: boolean;
}

export const AddTaskModal = ({ isOpen, onClose, onAdd, isPending }: AddTaskModalProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
      onClose();
    }
  };

  const handleClose = () => {
    setTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zinc-900">Adicionar Nova Tarefa</h2>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-zinc-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-2">
              Título da Tarefa
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Digite o título da tarefa..."
              className="w-full px-3 py-2 border placeholder:text-zinc-400 text-zinc-900 border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
              disabled={isPending}
              autoFocus
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer px-4 py-2 text-zinc-600 hover:text-zinc-800 transition-colors"
              disabled={isPending}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim() || isPending}
              className="cursor-pointer px-4 py-2 bg-zinc-950 text-white rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Adicionando..." : "Adicionar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 