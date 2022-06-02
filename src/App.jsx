import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';
import theme from './theme';
import { Login, Register } from './pages/auth';
import { useUser } from './hooks/useUser';
import { Layout } from './components/Layout';
import { RedirectPage } from './components/Routes';
import { ChemicalAnalysisList } from './pages/ChemicalAnalysis/ChemicalAnalysisList';
import { ChemicalAnalysisCreate } from './pages/ChemicalAnalysis/ChemicalAnalysisCreate';
import { ChemicalAnalysisReview } from './pages/ChemicalAnalysis/ChemicalAnalysisReview';
import { ChemicalAnalysisEdit } from './pages/ChemicalAnalysis/ChemicalAnalysisEdit';
import { Dashboard } from './pages/Dashboard';

function App() {
  const { getUser } = useUser();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route
          path="login"
          element={
            <RedirectPage>
              <Login getUser={getUser} />
            </RedirectPage>
          }
        />
        <Route
          path="register"
          element={
            <RedirectPage>
              <Register getUser={getUser} />
            </RedirectPage>
          }
        />
        <Route
          path="/chemical-analysis"
          element={
            <RedirectPage privatePath>
              <Layout>
                <ChemicalAnalysisList />
              </Layout>
            </RedirectPage>
          }
        />
        <Route
          path="/chemical-analysis/create"
          element={
            <RedirectPage privatePath>
              <Layout>
                <ChemicalAnalysisCreate />
              </Layout>
            </RedirectPage>
          }
        />
        <Route
          path="/chemical-analysis/:id"
          element={
            <RedirectPage privatePath>
              <Layout>
                <ChemicalAnalysisReview />
              </Layout>
            </RedirectPage>
          }
        />
        <Route
          path="/chemical-analysis/:id/edit"
          element={
            <RedirectPage privatePath>
              <Layout>
                <ChemicalAnalysisEdit />
              </Layout>
            </RedirectPage>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RedirectPage privatePath>
              <Layout>
                <Dashboard />
              </Layout>
            </RedirectPage>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
