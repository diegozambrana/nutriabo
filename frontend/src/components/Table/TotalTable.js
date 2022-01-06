import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
  } from '@mui/material'

export const TotalTable = ({totalData, columns}) => {

  return (
    <>
      Total
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.Header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {console.log(`columns`, columns)}
              {columns.map((column, index) => (
                <TableCell key={`${column.id}_${index}_`} align={column.align}>
                  {totalData[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}