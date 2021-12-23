import React from 'react';
import { Box } from '@mui/system';
import HelpIcon from '@mui/icons-material/Help';
import {IconButton, Tooltip} from '@mui/material';
import { FOOD_COLUMNS } from '../../utils';
import { DATA_TABLE } from '../../data';
import { EditText, Card, Table, TableFood } from '../index';

export const CardFood = ({}) => {
  const [title, setTitle] = React.useState('Title');
  const columns = React.useMemo(() => FOOD_COLUMNS, []);
  const data = React.useMemo(() => DATA_TABLE, [] )
  const [dataCardFood, setDataCardFood] = React.useState([])

  return (
    <Card>
      <Box display='flex'>
        <Box sx={{ flexGrow: 1 }}>
          <EditText value={title} variant="h3" onComplete={(text) => setTitle(text)}/>
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
          data={dataCardFood}
          onAddedNewValue={() => console.log(`onAddedNewValue`)}
          onUpdate={() => console.log(`onUpdate`)}
        />
      </Box>
    </Card>
  )
}