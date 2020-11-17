import React from 'react';
import { AddressForm } from './AddressForm';
import ImageUpload from '@common/ImageUpload';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { formStateStore } from './states';

export const PatientForm = () => {
  const classes = useStyles();
  const formState = React.useContext(formStateStore);

  const checkFormValidate = (event) => {
    event.preventDefault();
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
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <ImageUpload />
        <AddressForm />
        <div className={classes.buttons}>
          <Button variant='contained' color='primary' onClick={checkFormValidate} className={classes.button}>
            Save
          </Button>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
