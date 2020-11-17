import React, { useState } from 'react';
import { AddressForm } from './AddressForm';
import ImageUpload from '@common/ImageUpload';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { formStateStore } from './states';
import CircularProgress from '@material-ui/core/CircularProgress';

export const PatientForm = () => {
  const classes = useStyles();
  const formState = React.useContext(formStateStore);
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log({
      firstName: formState.firstName,
      lastName: formState.lastName,
      address: formState.address,
      city: formState.city,
      state: formState.state,
      country: formState.country,
      age: formState.age,
      mobilePhone: formState.mobilePhone,
      genderValue: formState.genderValue,
    });

    if (formState.checkFormValidate()) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <ImageUpload />
        <AddressForm />
        <div className={classes.buttons}>
          <Button
            disabled={loading}
            variant='contained'
            color='primary'
            onClick={submitForm}
            className={classes.button}
          >
            {loading ? <CircularProgress /> : 'Save'}
          </Button>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
