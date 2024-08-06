import { Button } from "@/components/ui/Button"
import { Column } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { ReactNode } from "react"
import { Movie } from "@/components/table/columns/columns"

const SortingButton = ({ column, children }: { column: Column<Movie>; children: ReactNode }) => {
  return (
    <Button
      variant="ghost"
      className="items-center justify-center font-bold uppercase"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 size-4" />
    </Button>
  )
}

export default SortingButton
