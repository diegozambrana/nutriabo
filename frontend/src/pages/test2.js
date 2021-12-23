import { Box } from '@mui/system';
import React from 'react';
import { EditText, DropDown } from '../components';
import { DATA_TABLE } from '../data';

export const Test2 = () => {
    const [testText, setTestText] = React.useState('Texto')
    return (
        <Box>
            <Box>Test 2</Box>
            <EditText value={testText} variant="h3" onComplete={(text) => setTestText(text)}/>
            <DropDown
                options={DATA_TABLE}
                label={'nombre'}
                placeholder={'Alimento'}
                onSelect={(option) => {console.log(option)}}
                onRemove={() => {console.log('Removed')}}
            />
        </Box>
    )
}