import logo from './logo.svg';
// import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import {Test} from './pages'
import { Layout } from './components/Layout'
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        test
        <Button variant="contained">Hello World</Button>
      </Layout>
    </ThemeProvider>
    
  )
}

export default App;
