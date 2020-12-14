import React, { useState } from 'react';
import { InputForm } from './InputForm';
import ImageUpload from '../ImageUpload';
import Button from '@material-ui/core/Button';
import { formStateStore } from './states';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApiService } from '@services/ApiService';

export const AddStaffForm = () => {
  const formState = React.useContext(formStateStore);
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    let data = {
      user: {
        username: formState.username,
      },
      first_name: formState.firstName,
      last_name: formState.lastName,
      address: formState.address,
      birth_date: null,
      identity_card: formState.age,
      insurance: formState.country,
      gender: formState.genderValue,
    };
    setLoading(true);
    ApiService.create_doctor(data)
      .then((res) => {
        if (res.statusCode === 201) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
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
        <InputForm />
        <div>
          <Button disabled={loading} variant='contained' color='primary' onClick={submitForm}>
            {loading ? <CircularProgress /> : 'Save'}
          </Button>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
