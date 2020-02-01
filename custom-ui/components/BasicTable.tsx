import { Fragment } from "react";
import theme from "../theme";

// Components
import { useTable } from "react-table";

export default ({
  columns,
  data
}: {
  columns: { Header: string; accessor: string }[];
  data: { [accessor: string]: any }[];
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  return (
    <Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <style jsx>{`
        table {
          width: 100%;
          ${theme.borderRadius}
          border-spacing: 0;
          border: 1px solid #fff;
        }

        th,
        td {
          margin: 0;
          padding: 0.5rem;
          border-bottom: 1px solid #fff;
          border-right: 1px solid #fff;
        }

        th:last-child,
        td:last-child {
          border-right: 0;
        }

        tr :last-child > td {
          border-bottom: 0;
        }
      `}</style>
    </Fragment>
  );
};
