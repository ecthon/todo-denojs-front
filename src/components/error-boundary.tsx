import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  error: Error | null;
  onRetry?: () => void;
}

export const ErrorBoundary = ({ error, onRetry }: ErrorBoundaryProps) => {
  if (!error) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mb-2">
          Ops! Algo deu errado
        </h2>
        <p className="text-zinc-600 mb-6">
          {error.message || "Ocorreu um erro inesperado. Tente novamente."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-zinc-950 text-white px-6 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  );
}; 