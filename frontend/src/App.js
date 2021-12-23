import logo from './logo.svg';
// import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import {Test} from './pages'
import { Layout } from './components/Layout'
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Test2 } from './pages';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Test2 />
      </Layout>
    </ThemeProvider>
    
  )
}

export default App;
