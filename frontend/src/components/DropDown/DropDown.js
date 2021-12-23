import React from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';

/**
 * DropDown
 * 
 * @param {list} options - List of objects
 * @param {string} label - key name of the text that will shows on input
 * @param {string} placeholder - placeholder for input
 * @param {function} onSelect - callback that send the object selected
 * @param {function} onRemove - callback that notify when the input was cleaned
 */

export const DropDown = ({options, label, placeholder, onSelect, onRemove}) => {
    return (
      <Autocomplete
        id="country-select-demo"
        options={options}
        autoHighlight
        getOptionLabel={(option) => option[label]}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <strong>{option.codigo}</strong> - {option[label]}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
          />
        )}
        onChange={(_, v) => v ? onSelect(v) : onRemove()}
      />
    )
}