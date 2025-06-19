export interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title: string;
}

export interface TaskActions {
  onToggle: (id: string) => void;
  onEdit: (id: string, data: UpdateTaskData) => void;
  onDelete: (id: string) => void;
  isPending: boolean;
} 