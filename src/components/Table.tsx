import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Country } from "../types";

const columnHelper = createColumnHelper<Country>();

const columns = [
  columnHelper.accessor("name", {
    header: () => "Country Name",
    minSize: 200,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("abbreviation", {
    header: () => "Code",
    minSize: 200,
    cell: (info) => <i>{info.getValue()}</i>,
  }),
  columnHelper.accessor("capital", {
    header: () => "Capital",
    minSize: 200,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("phone", {
    header: () => "ph Code",
    minSize: 500,
    size: 1000,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("population", {}),
  columnHelper.accessor("media.flag", {
    header: () => "flag",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("media.emblem", {
    header: () => "Emblem",
    footer: (info) => info.column.id,
  }),
];

export const Table = ({ data }: { data: Country[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="mt-4">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              {new Array(7).fill(null).map((_, index) => (
                <td key={index}></td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
