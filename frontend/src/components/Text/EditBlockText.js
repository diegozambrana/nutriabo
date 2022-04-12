import React from 'react';
import { Box, Typography, InputBase, TextareaAutosize } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles } from '@mui/styles';

/** 
 * Component that can edit the value
 * 
 * @param {string} value - text value
 * @param {function} onComplete - is called when edit is completed after click
 * on check icon or press enter key.
 * @param {string} variant - styles of Material Typography.
 */

export const EditBlockText = ({value, onComplete, variant='body2'}) => {
  const [editMode, setEditMode] = React.useState(false);
  const [editText, setEditText] = React.useState(value);
  const classes = useStyles({variant});

  const onAccept = () => {
    onComplete(editText);
    setEditMode(false);
  }

  const onCancel = () => {
    setEditText(value);
    setEditMode(false);
  }

  const onKeyDown = (e) => {
    if(e.key === "Enter") onAccept();
    else if(e.key === "Escape") onCancel();
  }

  return (        
    <Box className={classes.root}>
      {!editMode && (
        <Typography
          className={classes.text}
          variant={variant}
          onClick={() => setEditMode(!editMode)}
        >{value}</Typography>
      )}
      <Box
        className={classes.wrapperIcon}
        onClick={() => setEditMode(!editMode)}
      >
        <EditIcon />
      </Box>
      {editMode && (
        <Box position={'relative'}>
          <TextareaAutosize
            className={`${classes.input} ${variant}`}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus={editMode}
            onKeyDown={onKeyDown}
          />
          <Box className={classes.actions}>
            <CheckCircleIcon color="primary" onClick={onAccept} />
            <CancelIcon color="error" onClick={onCancel} />
          </Box>
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    '& $text:hover + $wrapperIcon': {
      display: 'inherit !important',
    }
  },
  text:{
    cursor: 'pointer',
    borderBottom: '1px solid rgba(0,0,0,0)',
    '&:hover': {
      borderBottom: '1px solid rgba(0,0,0,0.2)',
    }
  },
  wrapperIcon: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 0,
    display: 'none',
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.80)',
    boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
    borderRadius: '50%',
    '& svg': { marginTop: 4}
  },
  input: {
    fontWeight: props => theme.typography[props.variant].fontWeight,
    fontSize: props => theme.typography[props.variant].fontSize,
    lineHeight: props => theme.typography[props.variant].lineHeight,
    fontFamily: props => theme.typography[props.variant].fontFamily,
    width: '100%',
    minHeight: theme.spacing(10),
    border: 'none',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1),
    '& input': {padding: 0, margin: 0}
  },
  actions: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    '& svg': {
      width: 30,
      height: 30,
      cursor: 'pointer',
      verticalAlign: 'middle'
    }
  }
}));