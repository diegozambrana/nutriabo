import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog } from '../../../components/Dialog';
import { MacronutrientsTable } from './MacronutrientsTable';
import {
  updateActivityFactor,
  updateInjuryFactor,
  updateMolecularCalc,
  updateMolecularDistribution,
} from '../../../redux/slices/diet';
import {
  calculateMolecularCalc,
  calculateMolecularDistribution,
} from '../../../utils/handlers';
import {
  ACTIVITY_FACTOR,
  formatNumber,
  INJURY_FACTOR,
  INJURY_VALUE,
} from '../../../utils';
import { Select } from '../../../components/Select';

export function UpdateMolecular({ open, handleClose, onAccept }) {
  const { molecularCalc, molecularDistribution, activityFactor, injuryFactor } =
    useSelector((s) => s.diet);
  const RCT = useMemo(() => {
    if (molecularCalc) return molecularCalc.RCT;
    return 0;
  }, [molecularCalc]);
  const dispatch = useDispatch();
  const onUpdateMolecularCalc = ({ target: { value, name } }) => {
    dispatch(
      updateMolecularCalc(
        calculateMolecularCalc(
          {
            ...molecularCalc,
            [name]: value,
          },
          activityFactor,
          injuryFactor,
        ),
      ),
    );
  };

  const onUpdateDistribution = (newData) => {
    dispatch(
      updateMolecularDistribution(calculateMolecularDistribution(newData, RCT)),
    );
  };

  useEffect(() => {
    onUpdateDistribution(molecularDistribution);
  }, [RCT]);

  useEffect(() => {
    if (activityFactor && injuryFactor) {
      dispatch(
        updateMolecularCalc(
          calculateMolecularCalc(molecularCalc, activityFactor, injuryFactor),
        ),
      );
    }
  }, [activityFactor, injuryFactor]);

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title="Actualizar valor molecular"
      onAccept={onAccept}
      onCancel={handleClose}
      content={
        <Box pt={1}>
          <Box mb={2}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Género
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="genre"
                value={molecularCalc.genre}
                onChange={onUpdateMolecularCalc}
              >
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box display="flex">
            <Box mr={1}>
              <TextField
                id="weight"
                label="Peso"
                type="number"
                size="small"
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'weight' }}
                value={molecularCalc.weight}
                onChange={onUpdateMolecularCalc}
              />
            </Box>
            <Box mr={1}>
              <TextField
                id="size"
                label="Talla"
                type="number"
                size="small"
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'size' }}
                value={molecularCalc.size}
                onChange={onUpdateMolecularCalc}
              />
            </Box>
            <Box>
              <TextField
                id="age"
                label="Edad"
                type="number"
                size="small"
                InputLabelProps={{ shrink: true }}
                inputProps={{ name: 'age' }}
                value={molecularCalc.age}
                onChange={onUpdateMolecularCalc}
              />
            </Box>
          </Box>

          <Box mt={2} mb={2} display="flex">
            <Box width="50%" mr={1}>
              <Select
                options={ACTIVITY_FACTOR}
                label="Factor de actividad"
                labelId="activity_factor_label"
                id="activity_factor"
                value={activityFactor}
                onChange={(value) => {
                  dispatch(updateActivityFactor(value));
                }}
              />
            </Box>
            <Box width="50%" ml={1}>
              <Select
                options={INJURY_FACTOR}
                label="Factor de injuria"
                labelId="injury_factor_label"
                id="injury_factor"
                value={injuryFactor.code}
                onChange={(value) => {
                  dispatch(
                    updateInjuryFactor({
                      value: INJURY_VALUE[value],
                      code: value,
                    }),
                  );
                }}
              />
            </Box>
          </Box>

          <Box display="flex" mt={2} mb={1}>
            <Box mr={2}>RCB: {formatNumber(molecularCalc.RCB, 'number')}</Box>
            <Box mr={2}>RCT: {formatNumber(molecularCalc.RCT, 'number')}</Box>
          </Box>

          <Box>
            <MacronutrientsTable
              molecularDistribution={molecularDistribution}
              onUpdateDistribution={(newData) => {
                onUpdateDistribution(newData);
              }}
            />
          </Box>
        </Box>
      }
    />
  );
}
