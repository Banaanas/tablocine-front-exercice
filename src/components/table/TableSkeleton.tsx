import Skeleton from "@/components/ui/skeleton"

const TableSkeleton = () => {
  return (
    <div className="flex min-h-64 w-full min-w-[900px] max-w-6xl flex-col items-center justify-between gap-y-2 rounded-xl p-10">
      <Skeleton className="h-[48px] w-full rounded-sm bg-gray-400" />
      <div className="flex w-full flex-row gap-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-[440px] w-full rounded-sm bg-gray-400" />
        ))}
      </div>
      <div className="text-traaceTertiary-dark flex flex-col items-center justify-center text-2xl italic">
        <span>Data for your Movies Table is being loaded</span>
        <span>Thanks for you patience.</span>
      </div>
    </div>
  )
}

export default TableSkeleton
