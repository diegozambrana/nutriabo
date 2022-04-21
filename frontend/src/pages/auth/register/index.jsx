import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Alert,
  Container,
  TextField,
  Typography
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../../graphql/mutation';
import { NavLink, useNavigate } from 'react-router-dom';
import { setRefresh, setAccess } from '../../../utils';


export const Register = ({getUser}) => {
  const {user} = useSelector(s => s.user);
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  useEffect(() => {
    if(user) navigate('/dashboard');
  }, [user])
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required(
          'First name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required(
          'Last name is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required'),
      password2: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (value) => {
      createUser({variables: {
        email: value.email,
        firstName: value.firstName,
        lastName: value.lastName,
        password: value.password,
      }}).then((result) => {
        setAccess(result.data.createUser.token)
        setRefresh(result.data.createUser.refreshToken)
        getUser();
        
      })
      .catch((errorData) => {console.error(errorData.message)});
    }
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Crea una cuenta nueva
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Usa tu email para crear una cuenta nueva
              </Typography>
            </Box>

            {!!error && <Alert severity="error">
              { error?.message.includes("UNIQUE")
                ? `El correro electrónico ya esta registrado con otra cuenta.`
                : 'Error al crear la cuenta, intente de nuevo despues.'
              }
            </Alert>}

            <TextField
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label="Nombre"
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label="Apellido"
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Correo electrónico"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Confirmar Contraseña"
              margin="normal"
              name="password2"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password2}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              ¿Ya tienes cuenta?
              {' '}
              <NavLink to="/login">Ingresar</NavLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Register;