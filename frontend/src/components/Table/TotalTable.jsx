import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography
} from '@mui/material';
import { TableCell } from './TableCell';
import { Card } from '../index';
import { FOOD_COLUMNS } from '../../utils';

export const TotalTable = ({totalData}) => {
  const columns = FOOD_COLUMNS.slice(2, FOOD_COLUMNS.length - 1)
  return <Card>
    <Box mb={2}>
      <Typography variant="h5">Total</Typography>
    </Box>
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
                {totalData[column.accessor]}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
}