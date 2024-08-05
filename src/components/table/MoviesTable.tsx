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

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" />
  }

  return <DataTable columns={columns} data={data.movies} />
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
