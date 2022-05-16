import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { RowFood } from './RowFood';
import { TotalTimeFoodTable } from './TotalTimeFoodTable';
import { FOOD_COLUMNS, NEW_ROW, formatNumber } from '../../utils';

export const TableFood = ({
  aliments,
  total,
  onUpdateFood,
  onRemoveFood,
  onAddNewRow: AddNewRow
}) => {
  const columns = React.useMemo(() => FOOD_COLUMNS, []);
  const columnsTotal = React.useMemo(() => {
    let l = [...FOOD_COLUMNS];
    l.splice(0,2);
    l.pop();
    return l;
  }, []);


  React.useEffect(() => {
    // start block with one row
    if(aliments.length === 0 ) AddNewRow(NEW_ROW)
  }, [aliments])

  const onUpdate = (option, amount, index) => {
    // update every field based on 100g (amount * value / 100)
    const row = {}
    Object.keys(aliments[index]).forEach((key) => {
      if (key !== 'nombre' && key !== 'cantidad' && key !== 'actions'){
        const value = option[key] || 0;
        row[key] = formatNumber((amount * value) / 100, 'number');
      }
    });
    onUpdateFood(index, row)
  }

  return (
    <Box>
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
            {aliments.map((row, index) => (
              <RowFood
                key={`t_${index}`}
                columns={columns}
                row={row}
                onUpdate={onUpdate}
                index={index}
                onRemove={onRemoveFood}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box ml={1}>
        <Button
          onClick={() => AddNewRow(NEW_ROW)}
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
        >Nuevo Alimento</Button>
      </Box>

      <Box mt={3}>
        <TotalTimeFoodTable totalData={total} columns={columnsTotal} />
      </Box>
    </Box>
  )
}