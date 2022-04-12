import { Box } from '@mui/system';
import React from 'react';
import { CardFood } from '../components';
import { EditText } from '../components';
import { useSelector,useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addFoodTime, updateTitle } from '../redux/slices/diet';
import AddIcon from '@mui/icons-material/Add';

export const Test2 = () => {
    const {foodTimes, titleDiet} = useSelector(s => s.diet);
    const dispatch = useDispatch();
    console.log(` titleDiet` , titleDiet)

    return (
        <Box>
            <EditText
                value={titleDiet}
                variant="h3"
                onComplete={(text) => {
                  dispatch(updateTitle(text))
                }}
            />
            {foodTimes.map((foodTime, index) => (
                <CardFood
                    foodTimeData={foodTime}
                    index={index}
                    key={`food__time__${index}`}
                />
            ))}
            <Button
                onClick={() => dispatch(addFoodTime())}
                variant="contained"
                startIcon={<AddIcon />}
            >Nuevo Tiempo de comida</Button>
        </Box>
    )
}