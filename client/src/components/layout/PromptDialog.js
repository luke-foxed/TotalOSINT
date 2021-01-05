import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import { colPrimary, colSecondary } from '../../helpers/colors';

export const PromptDialog = ({
  title,
  message,
  open,
  handleClose,
  onConfirm,
}) => {
  const handleConfirmClick = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: '15px',
          borderBottom: '4px solid ' + colPrimary,
        },
      }}
    >
      <DialogTitle>
        <Typography
          style={{
            fontFamily: 'Quicksand',
            fontSize: '22px',
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: colSecondary }}>
          Cancel
        </Button>
        <Button onClick={handleConfirmClick} style={{ color: colPrimary }}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
