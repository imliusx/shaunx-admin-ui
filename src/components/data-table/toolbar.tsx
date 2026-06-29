import { type Table } from "@tanstack/react-table"
import { SearchIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableViewOptions } from "./view-options"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  searchPlaceholder?: string
  searchKey?: string
  filters?: {
    columnId: string
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Filter...",
  searchKey,
  filters = [],
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-2 sm:flex-row sm:items-center">
        {searchKey ? (
          <InputGroup className="w-37.5 lg:w-62.5">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={
                (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn(searchKey)?.setFilterValue(event.target.value)
              }
            />
          </InputGroup>
        ) : (
          <InputGroup className="w-37.5 lg:w-62.5">
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput
              placeholder={searchPlaceholder}
              value={table.getState().globalFilter ?? ""}
              onChange={(event) => table.setGlobalFilter(event.target.value)}
            />
          </InputGroup>
        )}
        <div className="flex gap-x-2">
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId)
            if (!column) return null
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            )
          })}
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters()
              table.setGlobalFilter("")
            }}
            className="px-2 lg:px-3"
          >
            Reset
            <X data-icon="inline-end" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
