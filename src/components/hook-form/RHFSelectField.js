import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { Stack, IconButton, InputAdornment, InputLabel, MenuItem, FormControl, Select } from '@mui/material';


// ----------------------------------------------------------------------

RHFCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
};

export function RHFSelectField({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => 
            // <Checkbox {...field} checked={field.value} />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">User Role</InputLabel>
              <Select
                {...field}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={field.value}
                label="UserRole"
              >
                <MenuItem value="admin">Administrator </MenuItem>
                <MenuItem value="user">User</MenuItem>
              </Select>
            </FormControl>

            // <TextField
            //   {...field}
            //   fullWidth
            //   value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
            //   error={!!error}
            //   helperText={error?.message}
            //   {...other}
            // />

          }
        />
      }
      {...other}
    />
  );
}