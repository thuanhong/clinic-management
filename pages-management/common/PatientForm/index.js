import React, { useState } from 'react';
import { AddressForm } from './AddressForm';
import ImageUpload from '@common/ImageUpload';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { formStateStore } from './states';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApiService } from '@services/ApiService';

export const PatientForm = () => {
  const classes = useStyles();
  const formState = React.useContext(formStateStore);
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    let data = {
      first_name: formState.firstName,
      last_name: formState.lastName,
      address: formState.address,
      birth_date: null,
      identity_card: formState.age,
      insurance: formState.country,
      gender: formState.genderValue,
    };
    setLoading(true);
    ApiService.create_patient(data).then((res) => {
      if (res.statusCode === 201) console.log('true');
      else console.log('false');
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
