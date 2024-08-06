import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { DataTable } from "@/components/table/data-table/data-table"
import { columns } from "@/components/table/columns/columns"
import axios from "axios"

const MoviesTable = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  })

  if (isLoading)
    return (
      <div className="max-w-6x flex max-h-[500px] grow flex-col items-center justify-center gap-y-10 overflow-hidden rounded-sm bg-gray-200 p-10 md:max-h-none">
        <LoadingSpinner className="h-12 md:h-24" />
        <div className="flex flex-col items-center justify-center text-center text-2xl font-bold italic text-traacePrimary-dark">
          <span>Data for your Movies Table is being loaded</span>
          <span>Thanks for you patience.</span>
        </div>
      </div>
    )

  if (error) {
    return (
      <div className="max-w-6x flex max-h-[500px] grow flex-col items-center justify-center gap-y-10 overflow-hidden rounded-sm bg-gray-200 p-10 md:max-h-none">
        <div className="flex flex-col items-center justify-center text-center text-2xl font-bold italic text-red-500">
          <span>We're sorry, but there was a problem loading the data.</span>
          <span>Please try again later.</span>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl">
      <DataTable columns={columns} data={data.movies} />
    </div>
  )
}

export default MoviesTable

const fetchMovies = async () => {
  const response = await axios.get("http://localhost:3000", {
    params: {
      sortBy: "title"
    }
  })

  return response.data
}
