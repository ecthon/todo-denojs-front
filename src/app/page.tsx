import { Circle, CircleCheck, CircleDashed, Edit, Loader, LoaderCircle, LoaderPinwheel, LucideTrash2, RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col space-y-4 w-full h-screen items-center justify-center bg-gray-100">
      {/* Header */}
      <div className="flex flex-col space-y-4 bg-white p-4 rounded-3xl shadow-sm max-w-md w-full">
        <h1 className="text-zinc-600 text-xs font-semibold">TODO.</h1>
        <div className="flex flex-col text-zinc-950">
          <p className="text-3xl font-code font- font-bold">10/10</p>
          <div className="flex items-center space-x-2 text-sm">
            <RefreshCw className="w-4 h-4 text-zinc-950" />
            <span className="text-sm">Progress of your activities.</span>
          </div>
        </div>
        <button className="bg-zinc-950 py-3 rounded-lg text-white cursor-pointer">Add new task</button>
      </div>
      {/* Task Open */}
      <div className="flex flex-col space-y-4 bg-white p-4 rounded-3xl shadow-sm max-w-md w-full">
        <h1 className="text-zinc-600 text-xs font-semibold">OPEN</h1>
        <div className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-100">
          <div className="flex items-center space-x-2">
            <button className="group flex items-center justify-center cursor-pointer bg-white rounded-full">
              <Circle className="w-5 h-5 text-zinc-600 group-hover:text-zinc-950 bg-white rounded-full transition-colors" />
            </button>
            <p className="text-zinc-950 text-sm">Create a API withe Deno.js</p>
          </div>
          <div className="flex items-center justify-center gap-0.5">
            <button className="flex items-center cursor-pointer justify-center p-1 rounded-md hover:bg-zinc-200 transition-colors">
              <Edit className="w-4 h-4 text-zinc-900 hover:text-zinc-950 transition-colors" />
            </button>
            <button className="flex items-center cursor-pointer justify-center p-1 rounded-md hover:bg-zinc-200 transition-colors">
              <LucideTrash2 className="w-4 h-4 text-zinc-900 hover:text-zinc-950 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Task Close */}
      <div className="flex flex-col space-y-4 bg-white p-4 rounded-3xl shadow-sm max-w-md w-full">
        <h1 className="text-zinc-600 text-xs font-semibold">CLOSE</h1>
        <div className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-100">
          <div className="flex items-center space-x-2">
            <button className="flex items-center justify-center cursor-pointer bg-white rounded-full">
              <CircleCheck className="w-5 h-5 text-zinc-950 bg-white rounded-full" />
            </button>
            <p className="text-zinc-400 line-through text-sm text-">Create a API withe Deno.js</p>
          </div>
          <div className="flex items-center justify-center gap-0.5">
            <button className="flex items-center cursor-pointer justify-center p-1 rounded-md hover:bg-zinc-200 transition-colors duration-200">
              <LucideTrash2 className="w-4 h-4 text-zinc-900 hover:text-zinc-950 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
