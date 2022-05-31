import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { TableCell } from './TableCell';
import { formatNumber } from '../../utils';

export function TotalTimeFoodTable({ totalData, columns }) {
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
            {columns.map((column) => (
              <TableCell
                key={`${column.id}_${column.accessor}_`}
                align={column.align}
              >
                {formatNumber(totalData[column.accessor], 'number')}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
