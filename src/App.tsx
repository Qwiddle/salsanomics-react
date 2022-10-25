import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Nav/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { DAppProvider } from './dapp/dapp';
import { APP_NAME } from './const/default';
import NotFound from './pages/NotFound/NotFound';

const AppContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <DAppProvider appName={APP_NAME}>
      <AppContainer>
        <NavBar />
        <Routes>
          <Route path="/" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </DAppProvider>
  );
}

export default App;
