import './App.css';
import { Layout } from './components/Layout'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route, Link } from "react-router-dom";
import { theme } from './theme';
import { Test2 } from './pages';
import { Login, Register } from './pages/auth'


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>

        <Route path="/dashboard" element={<Layout>
          <Test2 />
        </Layout>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      
    </ThemeProvider>
    
  )
}

export default App;
