import { Box } from '@mui/system';
import React from 'react';
import { EditText } from '../components'

export const Test2 = () => {
    const [testText, setTestText] = React.useState('Texto')
    return (
        <Box>
            <Box>Test 2</Box>
            <EditText value={testText} variant="h3" onComplete={(text) => setTestText(text)}/>
        </Box>
    )
}