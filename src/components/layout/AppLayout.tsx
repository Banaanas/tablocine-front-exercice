import { QueryClientProvider } from "@tanstack/react-query"
import { reactQueryClient } from "@/lib/react-query"
import MoviesTable from "@/components/table/MoviesTable"

const AppLayout = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
        <div className="flex flex-col gap-y-10">
          <h1 className="text-4xl font-bold text-blue-700">Sustainable Traace Movies</h1>
        </div>
        <div className="max-w-6xl py-10">
          <MoviesTable />
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default AppLayout
