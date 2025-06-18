import { Circle, CircleCheck, CircleDashed, Edit, Loader, LoaderCircle, LoaderPinwheel, LucideTrash2, RefreshCw } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-gray-50">
      <div className="flex w-96 flex-col shadow-2xl space-y-1 rounded-[20px] border p-1">
        {/* Header */}
        <div className="flex flex-col space-y-4 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold">TODO.</h1>
          <div className="flex flex-col text-zinc-950">
            <p className="text-3xl font-code font- font-bold">10/10</p>
            <div className="flex items-center space-x-2 text-sm">
              <RefreshCw className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-zinc-500">Progress of your activities.</span>
            </div>
          </div>
          <button className="bg-zinc-950 p-3 rounded-lg text-white cursor-pointer">Add new task</button>
        </div>
        {/* Task Open */}
        <div className="flex flex-col space-y-4 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold">OPEN</h1>
          <div className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-50">
            <div className="flex items-center space-x-2">
              <button className="group flex items-center justify-center cursor-pointer bg-white rounded-full">
                <Circle className="w-5 h-5 text-zinc-400 group-hover:text-zinc-950 bg-white rounded-full transition-colors" />
              </button>
              <p className="text-zinc-950 text-sm">Create a API withe Deno.js</p>
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
        </div>

        {/* Task Close */}
        <div className="flex flex-col space-y-4 border bg-white p-4 rounded-2xl max-w-md w-full">
          <h1 className="text-zinc-500 text-xs font-semibold">CLOSE</h1>
          <div className="flex justify-between border border-zinc-200 p-3 rounded-lg bg-zinc-50">
            <div className="flex items-center space-x-2">
              <button className="flex items-center justify-center cursor-pointer bg-white rounded-full">
                <CircleCheck className="w-5 h-5 text-zinc-400 hover:text-zinc-950 bg-white rounded-full" />
              </button>
              <p className="text-zinc-400 line-through text-sm text-">Create a API withe Deno.js</p>
            </div>
            <div className="flex items-center justify-center gap-0.5">
              <button className="group flex items-center cursor-pointer justify-center p-1.5 rounded-md hover:bg-zinc-200 transition-colors duration-200">
                <LucideTrash2 className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
