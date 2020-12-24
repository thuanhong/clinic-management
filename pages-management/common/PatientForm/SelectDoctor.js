import React, { useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react-lite';
import { formStateStore } from './states';
import { ApiService } from '@services/ApiService';

export const SelectDoctor = observer(() => {
  const formState = React.useContext(formStateStore);

  useEffect(() => {
    ApiService.get_list_doctor().then((res) => {
      if (res.statusCode === 200) {
        formState.updateListDoctor(res.msg);
      }
    });
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel id='demo-simple-select-label'>Doctor</InputLabel>
      <Select labelId='demo-simple-select-label' id='demo-simple-select' onChange={formState.updateDoctorId}>
        {formState.listDoctor.map((name, index) => (
          <MenuItem key={index} value={name.user.id}>
            {name.first_name + ' ' + name.last_name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText></FormHelperText>
    </FormControl>
  );
});
