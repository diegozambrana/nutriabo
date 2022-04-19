
// import NextLink from 'next/link';
// import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { TOKEN_AUTH } from '../../../graphql/mutation';

export const Login = () => {
  // const router = useRouter();
  const [tokenAuth, { data, loading, error }] = useMutation(TOKEN_AUTH);

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
      console.log(`HERE onSUBMIT`, values)
      tokenAuth({variables: values}).then((result) => {
        // const { tokenAuth } = result.data;
        console.log(`result`, result)
        // localStorage.setItem('refreshToken', tokenAuth.refreshToken);
        // localStorage.setItem('token', tokenAuth.token);
        // history.push('/cursos')
      })
      .catch((error) => {console.error(error.message)});
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
                disabled={formik.isSubmitting}
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
              {' '} Registrate
              {/* <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  Sign Up
                </Link>
              </NextLink> */}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >Olvidaste tu Contraseña?</Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;