import React from 'react';
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow
  } from '@mui/material';
import { TableCell } from './TableCell';
import { formatNumber } from '../../utils';

export const TotalTimeFoodTable = ({totalData, columns}) => {

  return (
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
            {columns.map((column, index) => (
              <TableCell key={`${column.id}_${index}_`} align={column.align}>
                {formatNumber(totalData[column.accessor], 'number')}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}