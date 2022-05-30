import * as React from 'react';
import {
  Box,
  Button,
  Dialog as CustomDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

export const Dialog = ({
  open,
  handleClose,
  title,
  onAccept,
  onCancel,
  content,
  contentText
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {content && <Box>{content}</Box>}
        {contentText && <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>}
      </DialogContent>
      <DialogActions>
        {onCancel && <Button onClick={onCancel}>Cancelar</Button>}
        {onAccept && <Button onClick={onAccept} autoFocus variant="contained">Aceptar</Button>}
      </DialogActions>
    </CustomDialog>
  )
}