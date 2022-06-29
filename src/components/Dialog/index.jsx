import * as React from 'react';
import {
  Box,
  Button,
  Dialog as CustomDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export function Dialog({
  open,
  handleClose,
  title,
  onAccept,
  onCancel,
  content,
  contentText,
  acceptText = 'Aceptar',
  cancelText = 'Cancelar',
}) {
  return (
    <CustomDialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {content && <Box>{content}</Box>}
        {contentText && (
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {onCancel && <Button onClick={onCancel}>{cancelText}</Button>}
        {onAccept && (
          <Button onClick={onAccept} autoFocus variant="contained">
            {acceptText}
          </Button>
        )}
      </DialogActions>
    </CustomDialog>
  );
}
