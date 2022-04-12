import React from 'react';

import {Table as TableM, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'

import { useTable } from 'react-table';

export const Table = ({data, columns}) => {
  const tableInstance = useTable({ columns, data })
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  return (
    <TableM {...getTableProps()}>
      <TableHead>
      {// Loop over the header rows
      headerGroups.map(headerGroup => (
        // Apply the header row props
        <TableRow {...headerGroup.getHeaderGroupProps()}>
        {// Loop over the headers in each row
        headerGroup.headers.map(column => (
          // Apply the header cell props
          <TableCell
            //align={}
            style={{ minWidth: column.minWidth }}
            {...column.getHeaderProps()}
          >
          { column.render('Header')}
          </TableCell>
        ))}
        </TableRow>
      ))}
      </TableHead>
      {/* Apply the table body props */}
      <TableBody {...getTableBodyProps()}>
      {// Loop over the table rows
      rows.map(row => {
        // Prepare the row for display
        prepareRow(row)
        return (
        // Apply the row props
        <TableRow {...row.getRowProps()}>
          {// Loop over the rows cells
          row.cells.map(cell => {
          // Apply the cell props
          return (
            <TableCell align={cell.column.align} {...cell.getCellProps()}>
            {// Render the cell contents
            cell.render('Cell')}
            </TableCell>
          )
          })}
        </TableRow>
        )
      })}
      </TableBody>
    </TableM>
  )
}