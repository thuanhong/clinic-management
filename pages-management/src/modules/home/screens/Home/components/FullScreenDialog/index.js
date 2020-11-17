import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { PatientForm } from '@common/PatientForm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FullScreenDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{ marginTop: 10 }} variant='contained' fullWidth={true} color='primary' onClick={handleClickOpen}>
        Update Patient
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <PatientForm />
      </Dialog>
    </div>
  );
};
