import React from 'react';
import {
  TableCell,
  TableRow,
  InputBase
} from '@mui/material'
import { FOOD_COLUMNS, NEW_ROW } from '../../utils';
import { DATA_TABLE } from '../../data';
import { DropDown } from '../index';
import {IconButton, Tooltip} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/system';

export const RowFood = ({columns, row, index, onUpdate, onRemove}) => {
  const [option, setOption] = React.useState();
  const [amount, setAmount] = React.useState(0);

  React.useEffect(() => {
    if(option && amount){
      onUpdate(option, amount, index)
    }
  }, [option, amount])

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {columns.map((column, index) => {
        const value = row[column.accessor];

        const render = () => {
          if(column.accessor === 'actions'){
            return (
              <div>
                <IconButton onClick={() => onRemove(index)}>
                  <CancelIcon />
                </IconButton>
              </div>
            )
          }
          if(column.accessor === 'nombre'){
            return (
              <DropDown
                options={DATA_TABLE}
                label={'nombre'}
                placeholder={'Alimento'}
                onSelect={(option) => {setOption(option)}}
                onRemove={() => {setOption()}}
              />
            )
          }
          if (column.accessor === 'cantidad') {
            return (
              <InputBase
                placeholder="cantidad"
                inputProps={{type: 'number'}}
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
              />
            )
          }
          return value;
        }

        return (
          <TableCell key={`${column.id}_${index}`} align={column.align}>
            {render()}
          </TableCell>
        );
      })}
    </TableRow>
  )
}