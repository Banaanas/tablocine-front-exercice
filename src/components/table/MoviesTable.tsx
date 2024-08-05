import { useQuery } from "@tanstack/react-query"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import { Alert } from "antd"
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
      <div className="flex min-h-64 w-full min-w-[900px] max-w-6xl flex-col items-center justify-between gap-y-10 rounded-xl p-10">
        <LoadingSpinner className="h-24" />
        <div className="text-traaceTertiary-dark flex flex-col items-center justify-center text-2xl italic">
          <span>Data for your Movies Table is being loaded</span>
          <span>Thanks for you patience.</span>
        </div>
      </div>
    )

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" />
  }

  return (
    <div className="w-full min-w-[900px] max-w-6xl">
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
