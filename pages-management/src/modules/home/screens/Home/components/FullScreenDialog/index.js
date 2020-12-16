import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { PatientForm } from '@common/PatientForm';
import { ApiService } from '@services/ApiService';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const FullScreenDialog = ({ patientId }) => {
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
        <div>
          <IconButton onClick={handleClose} aria-label='Close modal'>
            <CloseIcon />
          </IconButton>
          <div style={{ padding: 50 }}>
            <PatientForm functionAPI={ApiService.update_patient} patientId={patientId} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
