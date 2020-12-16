import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { formStateStore } from './states';
import { SelectDoctor } from './SelectDoctor';

export const AddressForm = observer(({ selectDoctor }) => {
  const formState = React.useContext(formStateStore);

  const genderSelect = [
    {
      value: 'Male',
      label: 'Male',
    },
    {
      value: 'Female',
      label: 'Female',
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateFirstName}
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            error={formState.firstNameError !== ''}
            helperText={formState.firstNameError}
            value={formState.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateLastName}
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            error={formState.lastNameError !== ''}
            helperText={formState.lastNameError}
            value={formState.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            onChange={formState.updateAddress}
            id='address1'
            name='address1'
            label='Address line 1'
            fullWidth
            error={formState.addressError !== ''}
            helperText={formState.addressError}
            value={formState.address}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateBirthDate}
            id='birth'
            name='birth'
            label='Birth'
            type='date'
            fullWidth
            error={formState.birthDateError !== ''}
            helperText={formState.birthDateError}
            value={formState.birthDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateIdentifyNumber}
            id='identify'
            name='identify'
            label='Identify Number'
            fullWidth
            error={formState.identifyNumberError !== ''}
            helperText={formState.identifyNumberError}
            value={formState.identifyNumber}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateInsurance}
            type='insurance'
            id='insurance'
            label='Insurance'
            fullWidth
            error={formState.insuranceError !== ''}
            helperText={formState.insuranceError}
            value={formState.insurance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            select
            onChange={formState.updateGenderValue}
            value={formState.genderValue}
            id='gender'
            label='Gender'
            fullWidth
          >
            {genderSelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        {selectDoctor && (
          <Grid item xs={12} sm={6}>
            <SelectDoctor />
          </Grid>
        )}
      </Grid>
    </React.Fragment>
  );
});
