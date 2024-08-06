import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import SortingButton from "@/components/table/SortingButton"
import PosterImage from "@/components/table/PosterImage"
import { includesAllGenres } from "@/components/table/columns/column-filters-functions"

export const columns: ColumnDef<Movie>[] = [
  {
    accessorKey: "posterUrl",
    header: "",
    cell: ({ row, getValue }) => {
      const src = getValue<string>()
      const alt = row.original.title

      return <PosterImage src={src} alt={alt} />
    }
  },

  {
    accessorKey: "rating",
    header: ({ column }) => <SortingButton column={column}>Rating</SortingButton>,
    cell: info => info.getValue<number>().toFixed(1)
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortingButton column={column}>Title</SortingButton>,
    cell: info => <span>{info.getValue<string>()}</span>,
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue<string>(id).toLowerCase()
      const searchValue = (filterValue as string).toLowerCase()
      return rowValue.includes(searchValue)
    }
  },
  {
    accessorKey: "year",
    header: ({ column }) => <SortingButton column={column}>Year</SortingButton>
  },

  {
    accessorKey: "plot",
    header: "Plot",
    cell: info => <span className="flex text-left">{info.getValue<string>()}</span>
  },
  {
    accessorKey: "genres",
    header: "Genre",
    filterFn: includesAllGenres, // Use the includesGenres filter function
    cell: info => <span className="italic">{info.getValue<string[]>().join(", ")}</span>
  }
]

export interface Movie {
  id: number
  title: string
  rating: number
  year: string
  runtime: string
  genres: Array<string>
  director: string
  actors: string
  plot: string
  posterUrl: string
}
