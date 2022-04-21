import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from "react-router-dom";
import { theme } from './theme';
import { Test2 } from './pages';
import { Login, Register } from './pages/auth'
import { useUser } from './hooks/useUser';
import { Layout } from './components/Layout'
import { RedirectPage } from './components/Routes';


function App() {
  const {getUser} = useUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/dashboard" element={
          <RedirectPage privatePath>
            <Layout>
              <Test2 />
            </Layout>
          </RedirectPage>
        } />
        <Route path="login" element={
          <RedirectPage>
            <Login getUser={getUser} />
          </RedirectPage>
        } />
        <Route path="register" element={
          <RedirectPage>
            <Register getUser={getUser}/>
          </RedirectPage>
        } />
      </Routes>
      
    </ThemeProvider>
    
  )
}

export default App;
