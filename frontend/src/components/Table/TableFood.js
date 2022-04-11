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
import { FOOD_COLUMNS, NEW_ROW } from '../../utils';
import { formatNumber } from '../../utils';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { RowFood } from './RowFood';
import { TotalTable } from './TotalTable';


export const TableFood = ({aliments, onUpdateFood, onRemoveFood, onAddNewRow: AddNewRow}) => {
  const columns = React.useMemo(() => FOOD_COLUMNS, []);
  const columnsTotal = React.useMemo(() => {
    let l = [...FOOD_COLUMNS];
    l.splice(0,2);
    l.pop();
    return l;
  }, []);


  React.useEffect(() => {
    if(aliments.length === 0 ) AddNewRow(NEW_ROW)
  }, [aliments])

  const onUpdate = (option, amount, index) => {
    const row = {}
    Object.keys(aliments[index]).forEach((key) => {
      if (key !== 'nombre' && key !== 'cantidad' && key !== 'actions'){
        row[key] = formatNumber(amount * option[key], 'number');
      }
    });
    onUpdateFood(index, row)
  }

  const totalData = React.useMemo(() => {
    let total = {};
    columnsTotal.forEach(column => total[column.accessor] = 0)

    aliments.forEach(row => {
      columnsTotal.forEach(column => {
        total[column.accessor] = formatNumber(
          parseFloat(total[column.accessor]) + parseFloat(row[column.accessor]),
          'number'
        );
      })
    })
    return total
  }, [aliments, columnsTotal])

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
            {aliments.map((row, index) => {
              return (
                <RowFood
                  key={`t_${index}`}
                  columns={columns}
                  row={row}
                  onUpdate={onUpdate}
                  index={index}
                  onRemove={onRemoveFood}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box ml={2}>
        <Button
          onClick={() => AddNewRow(NEW_ROW)}
          variant="contained"
          startIcon={<AddIcon />}
        >Nuevo Alimento</Button>
      </Box>

      <Box mt={3}>
        <TotalTable totalData={totalData} columns={columnsTotal} />
      </Box>
    </Box>
  )
}