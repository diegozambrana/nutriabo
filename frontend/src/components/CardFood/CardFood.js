import React from 'react';
import { Box } from '@mui/system';
import HelpIcon from '@mui/icons-material/Help';
import {Button, IconButton, Tooltip} from '@mui/material';
import { EditText, Card, TableFood } from '../index';
import { useDispatch } from 'react-redux';
import {
  updateNameFoodTime,
  addNewFood,
  updateFood,
  removeFood
} from '../../redux/slices/diet';

export const CardFood = ({foodTimeData, index}) => {
  const dispatch = useDispatch()

  return (
    <Card>
      <Box display='flex'>
        <Box sx={{ flexGrow: 1 }}>
          <EditText
            value={foodTimeData.name}
            variant="h5"
            onComplete={(text) => {
              dispatch(updateNameFoodTime({index, value: text}))
            }}
          />
        </Box>
        <Box>
          <Tooltip title={
            <>
              <h2>Test this tooltip</h2>
              <p>EL siguiente es un ejemplo de algo que se hara en un futuro, si quiere mas información por favor preguntar al developer</p>
              <ul>
                <li>test 1</li>
                <li>test 2</li>
              </ul>
            </>
          }>
            <IconButton>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box mt={2} sx={{ width: '100%', overflow: 'hidden' }}>
        <TableFood
          aliments={foodTimeData.aliments || []}
          onAddNewRow={(value) => {
            dispatch(addNewFood({index, value}))
          }}
          onUpdateFood={(indexFood, value) => dispatch(updateFood({index, indexFood, value}))}
          onRemoveFood={(index) => dispatch(removeFood(index))}
        />
      </Box>
    </Card>
  )
}