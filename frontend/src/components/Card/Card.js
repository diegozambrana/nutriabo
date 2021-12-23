import React from 'react';
import {Paper, Box} from '@mui/material';


export const Card = ({children}) => {
  return (
    <Paper style={{margin: '16px 0'}}>
      <Box p={2}>
        {children}
      </Box>
    </Paper>
  );
}