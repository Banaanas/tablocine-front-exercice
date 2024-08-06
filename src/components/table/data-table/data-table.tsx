import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { useState } from "react"
import DataTablePagination from "@/components/table/DataTablePagination"
import { Input } from "@/components/ui/Input"
import { movieGenres } from "@/components/table/data/data"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/Button"
import DataTableFacetedFilter from "@/components/table/data-table-faced-filter"
import { cn } from "@/utils/utils"

export const DataTable = <TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([
    /* {
      id: "year", // Use the dynamically determined date field
      desc: true
    }*/
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      columnFilters,
      columnVisibility,
      sorting
    }
  })

  const isFiltered = table.getState().columnFilters.length > 0

  const facetFilters = movieFilters

  return (
    <div className="rounded-md border bg-white">
      <div className="flex items-center bg-gray-200 p-4">
        <Input
          placeholder="Find a movie..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={event => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex flex-wrap pl-2">
          {facetFilters.map(({ columnId, title, options }) =>
            table.getColumn(columnId) ? (
              <DataTableFacetedFilter
                key={columnId}
                column={table.getColumn(columnId)}
                title={title}
                options={options}
              />
            ) : null
          )}
        </div>
        {isFiltered && (
          <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-0">
            <XIcon className="size-4" />
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(index % 2 === 0 ? "bg-muted/40" : "bg-white")} // Apply different background color for even rows
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center font-bold italic">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

const movieFilters = [{ columnId: "genres", title: "Genre", options: movieGenres }]
