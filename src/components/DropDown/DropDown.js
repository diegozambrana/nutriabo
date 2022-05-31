import React from 'react';
import { Box, TextField, Autocomplete } from '@mui/material';
import { makeStyles } from '@mui/styles';
/* eslint-disable react/jsx-props-no-spreading */

/**
 * DropDown
 *
 * @param {list} options - List of objects
 * @param {string} label - key name of the text that will shows on input
 * @param {string} placeholder - placeholder for input
 * @param {function} onSelect - callback that send the object selected
 * @param {function} onRemove - callback that notify when the input was cleaned
 */

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
    '& > div > div': {
      padding: '0 !important',
    },
    '& > div > div > fieldset': {
      border: 'none !important',
    },
  },
  list: {
    position: 'absollute',
    top: 0,
    background: 'white',
    maxHeight: '300px',
    overflow: 'scroll',
    boxShadow: '1px 1px 3px rgb(0 0 0 / 20%)',
  },
}));

export function DropDown({ options, label, placeholder, onSelect, onRemove }) {
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-select-demo"
      className={classes.root}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option[label]}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option[label]}
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
      onChange={(_, v) => (v ? onSelect(v) : onRemove())}
    />
  );
}
