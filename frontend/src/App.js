import logo from './logo.svg';
// import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import {Test} from './pages'
import { Layout } from './components/Layout'
import Button from '@mui/material/Button';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import { theme } from './theme';
import { Test2 } from './pages';
import { Login, Register } from './pages/auth'
import { useAuth } from './graphql/useAuth'
import { useEffect } from 'react';

function App() {
  const {getToken} = useAuth()
  useEffect(() => {
    getToken();
  }, [])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>

        <Route path="/" element={<Layout>
          <Test2 />
        </Layout>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      
    </ThemeProvider>
    
  )
}

export default App;
