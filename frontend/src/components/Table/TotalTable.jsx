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
import { FOOD_COLUMNS, formatNumber } from '../../utils';

export const TotalTable = ({totalData, adequacyData}) => {
  const columns = FOOD_COLUMNS.slice(2, FOOD_COLUMNS.length - 1)
  const columnsAdequacy =  FOOD_COLUMNS.slice(2, 6)

  return <Card>
    <Box mb={2}>
      <Typography variant="h5">Total</Typography>
    </Box>
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
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
            <TableCell style={{fontWeight: 'bold'}}>Total</TableCell>
            {columns.map((column, index) => (
              <TableCell key={`${column.id}_${index}_`} align={column.align}>
                {formatNumber(totalData[column.accessor], 'number')}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell style={{fontWeight: 'bold'}}>Adecuación</TableCell>
            {columns.map((column, index) => (
              <TableCell key={`${column.id}_${index}_`} align={column.align}>
                { columnsAdequacy.includes(column) ? formatNumber(adequacyData[column.accessor], 'number') : ''}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
}