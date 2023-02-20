import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "../TokenBreakDown/Columns";
import { BREAKDOWN } from "../TokenBreakDown/TokenBreakdownData";

const TokenBreakDownTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => BREAKDOWN, []);

  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
    {/* <div class="square" style={{"transform": "rotate(  0deg)"}}>one</div>
    <div class="square" style={{"transform": "rotate( 40deg)"}}>two</div>
    <div class="square" style={{"transform": "rotate( 80deg)"}}>three</div>
    <div class="square" style={{"transform": "rotate(120deg)"}}>four</div>
    <div class="square" style={{"transform": "rotate(160deg)"}}>five</div>
    <div class="square" style={{"transform": "rotate(200deg)"}}>six</div>
    <div class="square" style={{"transform": "rotate(240deg)"}}>seven</div>
    <div class="square" style={{"transform": "rotate(280deg)"}}>eight</div>
    <div class="square" style={{"transform": "rotate(320deg)"}}>nine</div> */}

    {rows.map((row) => {
        return <div class="square" style={{"transform": "rotate( "+(row.id*40)+"deg)"}}><span style={{"transform":"rotate( 90deg)", "display":"block"}}>{row.original.id} <br/> {row.original.name} </span> </div>
      })}
    {/* <table className="table" {...getTableProps()} style={{"display": "unset"}}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => { 
                return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table> */}
    </div>
  );
};
export default TokenBreakDownTable;
