import React, { useState } from 'react';
import { InputForm } from './InputForm';
import ImageUpload from '../ImageUpload';
import Button from '@material-ui/core/Button';
import { formStateStore } from './states';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApiService } from '@services/ApiService';
import { useStyles } from './styles';

export const AddStaffForm = () => {
  const formState = React.useContext(formStateStore);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formState.checkFormValidate()) {
      setLoading(false);
      return;
    }
    const reuslt = await ApiService.upload_image({
      imageStr: formState.image,
    });
    console.log(reuslt);

    let data = {
      user: {
        username: formState.username,
        group: [],
        permission: [],
      },
      image: reuslt.msg.image,
      first_name: formState.firstName,
      last_name: formState.lastName,
      address: formState.location,
      birth_date: formState.birthDay,
      identity_card: formState.identity_card,
      insurance: formState.insurance,
      gender: formState.genderValue,
      email: formState.email,
      title: formState.title,
    };
    await ApiService.create_doctor(data);

    setLoading(false);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <ImageUpload updateImage={formState.updateImageString} />
        <InputForm />
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            disabled={loading}
            variant='contained'
            color='primary'
            onClick={submitForm}
          >
            {loading ? <CircularProgress /> : 'Save'}
          </Button>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
