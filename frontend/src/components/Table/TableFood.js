import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase
} from '@mui/material'
import { FOOD_COLUMNS, NEW_ROW } from '../../utils';
import { DATA_TABLE } from '../../data';
import { formatNumber } from '../../utils';
import { DropDown } from '../index';
import { Box } from '@mui/system';
import { RowFood } from './RowFood';


export const TableFood = ({}) => {
  const columns = React.useMemo(() => FOOD_COLUMNS, []);
  const [rows, setRows] = React.useState([]);

  const AddNewRow = () => {
    setRows([...rows, NEW_ROW])
  }

  React.useEffect(() => {AddNewRow()}, [])

  const onUpdate = (option, amount, index) => {
    let newRows = [...rows];
    console.log(option, amount, index)
    console.log(Object.keys(option))
    console.log(Object.keys(rows[index]))
    Object.keys(rows[index]).forEach((key) => {
      if (key !== 'nombre' && key !== 'cantidad'){
        newRows[index][key] = formatNumber(amount * option[key], 'number');
      }
    });
    setRows(newRows)
  }

  return (
    <Box>
    <TableContainer sx={{ maxHeight: 440 }}>
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
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <RowFood
                    columns={columns}
                    row={row}
                    onUpdate={onUpdate}
                    index={index}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      <Button onClick={AddNewRow}>Nuevo</Button>
  </Box>)
}