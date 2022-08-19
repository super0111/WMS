import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [ users, setUsers ] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [ userRole, setUserRole ] = useState("");
  const [ showPassword, setShowPassword ] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (value) => {
    const firstName = value.firstName;
    const lastName = value.lastName;
    const email = value.email;
    const password = value.password;
    const id = users.length;
    const formData = {
      id,
      firstName,
      lastName,
      userRole,
      email,
      password,
    }
    
    const user = users.find((item)=>item.email === email);

    if(user) {
      toast.error("User already exsit");
      return;
    }

    localStorage.setItem('users', JSON.stringify([...users, formData]));
    navigate('/login', { replace: true });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="UserRole"
            value={userRole}
            onChange={(e)=>setUserRole(e.target.value)}
          >
            <MenuItem value="admin">Administrator </MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </FormControl>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
      <ToastContainer />
    </FormProvider>
  );
}
