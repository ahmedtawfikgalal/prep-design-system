import './DataTable.css';

export type Column<T> = {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  caption?: string;
  emptyMessage?: string;
};

export const DataTable = <T,>({
  columns,
  data,
  rowKey,
  caption,
  emptyMessage = 'No data available',
}: DataTableProps<T>) => {
  return (
    <table className="data-table">
      {caption && <caption className="data-table__caption">{caption}</caption>}
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="data-table__th" scope="col">
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="data-table__empty" colSpan={columns.length}>
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr key={rowKey(row)} className="data-table__row">
              {columns.map((column) => (
                <td key={column.key} className="data-table__td">
                  {column.render
                    ? column.render(row)
                    : (row as Record<string, React.ReactNode>)[column.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
