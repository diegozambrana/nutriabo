import { Box } from '@mui/system';
import React from 'react';
import { CardFood, EditBlockText, TotalTable } from '../components';
import { EditText } from '../components';
import { useSelector,useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { addFoodTime, updateTitle, updateDescription } from '../redux/slices/diet';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export const Test2 = () => {
  const {
    foodTimes,
    titleDiet,
    descriptionDiet,
    total
  } = useSelector(s => s.diet);
  const dispatch = useDispatch();
  const handleSave = () => {}
  const handleExport = () => {}

  const controlBar = <Box display={'flex'} justifyContent={'flex-end'}>
    <Box>
      <Button
        onClick={handleSave}
        variant="contained"
        startIcon={<SaveIcon />}
        size="small"
      >Guardar</Button>
    </Box>
    <Box ml={1}>
      <Button
        onClick={handleExport}
        startIcon={<FileDownloadIcon />}
        size="small"
        variant="outlined" 
      >Export</Button>
    </Box>
  </Box>

  return (
    <Box>
      {controlBar}
      <Box>
        <Box mb={1}>
          <EditText
            value={titleDiet}
            variant="h5"
            onComplete={(text) => {
              dispatch(updateTitle(text))
            }}
          />
        </Box>
        <Box mb={1}>
          <EditBlockText
            value={descriptionDiet}
            onComplete={(text) => {
              dispatch(updateDescription(text))
            }}
          />
        </Box>
      </Box>
      
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
        size="small"
        startIcon={<AddIcon />}
      >Nuevo Tiempo de comida</Button>

      <TotalTable totalData={total} />
      
      {controlBar}
    </Box>
  )
}