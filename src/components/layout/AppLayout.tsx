import { QueryClientProvider } from "@tanstack/react-query"
import { reactQueryClient } from "@/lib/react-query"
import MoviesTable from "@/components/table/MoviesTable"
import { Clapperboard } from "lucide-react"

const AppLayout = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <main className="bg-traacePrimary-dark flex flex-grow flex-col items-center justify-start gap-y-10 p-12">
        <div className="flex w-full items-center gap-x-2 text-white">
          <Clapperboard size="48" />
          <span className="bg-red text-center text-4xl font-bold tracking-wide">Traallociné</span>
        </div>
        <MoviesTable />
      </main>
    </QueryClientProvider>
  )
}

export default AppLayout
