import * as React from 'react';
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select as SelectBase,
} from '@mui/material';

export function Select({ options, label, labelId, id, value, onChange }) {
  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <SelectBase
        labelId={labelId}
        id={id}
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem value={option.value}>{option.label}</MenuItem>
        ))}
      </SelectBase>
    </FormControl>
  );
}
