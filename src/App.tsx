import 'typeface-inter';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/Nav/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { DAppProvider } from './dapp/dapp';
import { APP_NAME } from './const/default';
import NotFound from './pages/NotFound/NotFound';
import Farm from './pages/Farm/Farm';

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
          <Route path="/casino" element={<Analytics />} />
          <Route path="/farm" element={<Farm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </DAppProvider>
  );
}

export default App;
