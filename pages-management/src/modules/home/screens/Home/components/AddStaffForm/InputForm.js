import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { observer } from 'mobx-react-lite';
import { formStateStore } from './states';

export const InputForm = observer(() => {
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

  const titleSelect = [
    {
      value: 'doctor',
      label: 'Doctor',
    },
    {
      value: 'nurse',
      label: 'Nurse',
    },
  ];

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateUsername}
            id='username'
            name='username'
            label='Username'
            fullWidth
            error={formState.userNameError !== ''}
            helperText={formState.userNameError}
          />
        </Grid>
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
            onChange={formState.updateLocation}
            id='location'
            name='location'
            label='Address'
            fullWidth
            error={formState.locationError !== ''}
            helperText={formState.locationError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateBio}
            id='bio'
            name='bio'
            label='Bio'
            fullWidth
            error={formState.bioError !== ''}
            helperText={formState.bioError}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={formState.updateEmail}
            id='email'
            name='email'
            label='Email'
            fullWidth
            error={formState.emailError !== ''}
            helperText={formState.emailError}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            onChange={formState.updateBirthDay}
            id='birth'
            name='birth'
            label='Birth'
            type='date'
            fullWidth
            error={formState.birthDayError !== ''}
            helperText={formState.birthDayError}
            InputLabelProps={{
              shrink: true,
            }}
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
            defaultValue={formState.title}
            select
            onChange={formState.updateTitle}
            id='title'
            label='Title'
            fullWidth
          >
            {titleSelect.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
