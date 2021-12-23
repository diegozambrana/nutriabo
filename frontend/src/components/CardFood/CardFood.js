import { Box } from '@mui/system';
import React from 'react';
import { EditText, Card } from '../index';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export const CardFood = ({}) => {
  const [title, setTitle] = React.useState('Title');
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
    </Card>
  )
}