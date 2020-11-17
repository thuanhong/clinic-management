import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { formStateStore } from './states';

export const AddressForm = observer(() => {
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
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateCity}
            id='city'
            name='city'
            label='City'
            fullWidth
            error={formState.cityError !== ''}
            helperText={formState.cityError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id='state' onChange={formState.updateState} name='state' label='State/Province/Region' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateCountry}
            id='country'
            name='country'
            label='Country'
            fullWidth
            error={formState.countryError !== ''}
            helperText={formState.countryError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={formState.updateAge}
            type='number'
            id='age'
            label='Age'
            fullWidth
            error={formState.ageError !== ''}
            helperText={formState.ageError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            defaultValue={formState.genderValue}
            select
            onChange={formState.updateGender}
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
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={formState.updateMobile}
            id='mobile'
            label='Mobile'
            fullWidth
            error={formState.mobilePhoneError !== ''}
            helperText={formState.mobilePhoneError}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
