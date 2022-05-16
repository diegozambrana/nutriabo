import { useEffect, useState } from 'react';
import {
  TableRow,
  InputBase,
  IconButton
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { TableCell } from './TableCell';
import { DropDown } from '../index';
import { useSelector } from 'react-redux';
import { GET_ALIMENT_BY_CODE } from '../../graphql/query';
import { client } from '../../graphql';
import { handlerAlimentData } from '../../utils/handlers';


export const RowFood = ({
  columns,
  row,
  index: indexRow,
  onUpdate,
  onRemove
}) => {
  const [option, setOption] = useState();
  const [amount, setAmount] = useState(0);
  const {alimentList} = useSelector(s => s.aliment);

  const getOptions = (code) => {
    // get aliment values from server and handle the data format
    client.query({
      query: GET_ALIMENT_BY_CODE,
      variables: {code}
    }).then((res) => {
      setOption(handlerAlimentData(res.data.getAlimentByCode));
    })
  }

  useEffect(() => {
    // update values fields when options or amount change their values
    if(option && amount){
      onUpdate(option, amount, indexRow)
    }
  }, [option, amount])

  const render = (column, value) => {
    // render different cell of row
    if(column.accessor === 'actions'){
      return (
        <div>
          <IconButton onClick={() => onRemove(indexRow)}>
            <CancelIcon />
          </IconButton>
        </div>
      )
    }
    if(column.accessor === 'nombre'){
      return (
        <DropDown
          options={alimentList}
          label={'nombre'}
          placeholder={'Alimento'}
          onSelect={(option) => {
            getOptions(option.codigo)
          }}
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
    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
      {columns.map((column, index) => {
        const value = row[column.accessor];
        return (
          <TableCell key={`${column.id}_${index}`} align={column.align}>
            {render(column, value)}
          </TableCell>
        );
      })}
    </TableRow>
  )
}