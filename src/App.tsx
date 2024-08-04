import React from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { Alert, List, Spin, Typography } from "antd"
import axios from "axios"

// Create a client
const queryClient = new QueryClient()

async function fetchMovies() {
  const response = await axios.get("http://localhost:3000", {
    params: {
      maxDelay: 2000,
      errorProbability: 0.1,
      limit: 10,
      offset: 0,
      filter: "genre=action",
      sortBy: "rating"
    }
  })

  console.log("RES", response)
  return response.data
}

function MoviesList() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies
  })

  if (isLoading) {
    return <Spin size="large" />
  }

  if (isError) {
    return <Alert message="Error" description={error.message} type="error" />
  }

  return (
    <List
      dataSource={data.movies}
      renderItem={item => (
        <List.Item key={item.id}>
          <Typography.Text>{item.title}</Typography.Text>
        </List.Item>
      )}
    />
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Typography.Title>Traace Exercise</Typography.Title>
        <MoviesList />
      </div>
    </QueryClientProvider>
  )
}

export default App
