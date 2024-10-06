import { QueryClientProvider } from "@tanstack/react-query"
import { reactQueryClient } from "@/lib/react-query"
import MoviesTable from "@/components/table/MoviesTable"
import { Clapperboard } from "lucide-react"

const AppLayout = () => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <main className="flex flex-grow flex-col items-center justify-start gap-y-4 bg-tablocinePrimary-dark p-4 md:gap-y-10 md:p-12">
        <div className="flex w-full items-center gap-x-2 text-white">
          <Clapperboard size="48" />
          <span className="text-center text-2xl font-bold tracking-wide md:text-4xl">Traallociné</span>
        </div>
        <MoviesTable />
      </main>
    </QueryClientProvider>
  )
}

export default AppLayout
