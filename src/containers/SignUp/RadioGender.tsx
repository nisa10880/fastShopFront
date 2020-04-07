import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioGender = props => {
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Gender</FormLabel>
        <RadioGroup style={{ display: 'block' }} aria-label="gender" name="sexe" onChange={props.onChange} value={props.value}>
          <FormControlLabel value="F" control={<Radio color="primary" />} label="Female" labelPlacement="start" />
          <FormControlLabel value="M" control={<Radio color="primary" />} label="Male" labelPlacement="start" />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default RadioGender;
