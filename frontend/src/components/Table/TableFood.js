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


export const TableFood = ({}) => {
  const columns = React.useMemo(() => FOOD_COLUMNS, []);
  const columnsTotal = React.useMemo(() => {
    let l = [...FOOD_COLUMNS];
    l.splice(0,2);
    l.pop();
    return l;
  }, []);
  const [rows, setRows] = React.useState([]);

  const AddNewRow = () => {
    setRows([...rows, NEW_ROW])
  }

  React.useEffect(() => {
    if(rows.length === 0 ) AddNewRow()
  }, [rows])

  const onUpdate = (option, amount, index) => {
    let newRows = [...rows];
    const row = {}
    Object.keys(rows[index]).forEach((key) => {
      if (key !== 'nombre' && key !== 'cantidad' && key !== 'actions'){
        row[key] = formatNumber(amount * option[key], 'number');
      }
    });
    newRows[index] = row;
    setRows(newRows);
  }

  const onRemove = (index) => {
    let newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  }

  const totalData = React.useMemo(() => {
    let total = {};
    columnsTotal.forEach(column => total[column.accessor] = 0)

    rows.forEach(row => {
      columnsTotal.forEach(column => {
        total[column.accessor] = formatNumber(
          parseFloat(total[column.accessor]) + parseFloat(row[column.accessor]),
          'number'
        );
      })
    })
    return total
  }, [rows, columnsTotal])

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
            {rows
              .map((row, index) => {
                return (
                  <RowFood
                    key={`t_${index}`}
                    columns={columns}
                    row={row}
                    onUpdate={onUpdate}
                    index={index}
                    onRemove={onRemove}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box ml={2}>
        <Button
          onClick={AddNewRow}
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