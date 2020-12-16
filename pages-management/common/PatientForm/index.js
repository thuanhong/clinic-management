import React, { useState, useEffect } from 'react';
import { AddressForm } from './AddressForm';
import Button from '@material-ui/core/Button';
import { useStyles } from './styles';
import { formStateStore } from './states';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ApiService } from '@services/ApiService';

export const PatientForm = (props) => {
  const { functionAPI, patientId } = props;
  const classes = useStyles();
  const formState = React.useContext(formStateStore);
  const [loading, setLoading] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    let data = {
      first_name: formState.firstName,
      last_name: formState.lastName,
      address: formState.address,
      birth_date: formState.birthDate,
      identity_card: formState.identifyNumber,
      insurance: formState.insurance,
      gender: formState.genderValue,
    };
    setLoading(true);
    functionAPI(
      {
        doctor: formState.doctorId,
        patient: data,
        treatment: null,
      },
      patientId,
    )
      .then((res) => {
        if (res.statusCode === 201) {
          formState.deleteDataInput();
        }
      })
      .catch((err) => {
        console.warn(err);
      });

    if (formState.checkFormValidate()) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      ApiService.get_patient_detail(patientId)
        .then((res) => {
          formState.fillValue(res.msg);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <React.Fragment>
      <React.Fragment>
        <AddressForm selectDoctor={patientId ? false : true} />
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
