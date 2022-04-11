import { Box } from '@mui/system';
import React from 'react';
import { CardFood} from '../components';
import { useSelector,useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addFoodTime } from '../redux/slices/diet';
import AddIcon from '@mui/icons-material/Add';

export const Test2 = () => {
    const foodTimes = useSelector(s => s.diet.foodTimes);
    const dispatch = useDispatch();

    return (
        <Box>
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