import { FilterFn } from "@tanstack/react-table"
import { Movie } from "@/components/table/columns/columns"

// Filter Genres alternatively (eg: Action && Comedy)
const includesGenres: FilterFn<Movie> = (row, columnId, filterValue) => {
  const rowGenres = row.getValue<string[]>(columnId)
  return rowGenres.some(genre => filterValue.includes(genre))
}

// Filter Genres cumulatively (eg: Action || Comedy)
export const includesAllGenres: FilterFn<Movie> = (row, columnId, filterValue) => {
  const rowGenres = row.getValue<string[]>(columnId)
  // Check that every genre in filterValue is present in rowGenres
  return filterValue.every((genre: string) => rowGenres.includes(genre))
}
