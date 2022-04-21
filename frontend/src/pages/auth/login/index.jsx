import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  Alert
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { NavLink, useNavigate } from 'react-router-dom';
import { TOKEN_AUTH } from '../../../graphql/mutation';
import { setRefresh, setAccess } from '../../../utils';


export const Login = ({getUser}) => {
  const {user} = useSelector(s => s.user);
  const [tokenAuth, { loading, error }] = useMutation(TOKEN_AUTH);
  const navigate = useNavigate()

  useEffect(() => {
    if(user) navigate('/dashboard');
  }, [user])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Must be a valid email')
        .max(255)
        .required(
          'Email is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Password is required')
    }),
    onSubmit: (values) => {
      tokenAuth({variables: values}).then((result) => {
        setAccess(result.data.tokenAuth.token);
        setRefresh(result.data.tokenAuth.refreshToken);
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
                Acceso
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Ingresa en la plataforma
              </Typography>
            </Box>

            {!!error && <Alert severity="error">Usuario o Contraseña incorrectas</Alert>}

            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Correo Electrónico"
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={loading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Ingresar
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Aún no tienes una cuenta?
              {' '} <NavLink to="/register" component={Link}>Registrate</NavLink>
            </Typography>
            {/* <Typography
              color="textSecondary"
              variant="body2"
            >Olvidaste tu Contraseña?</Typography> */}
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;