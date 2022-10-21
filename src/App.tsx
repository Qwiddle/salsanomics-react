import styled from 'styled-components';
import NavBar from './components/Nav/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { DAppProvider } from './dapp/dapp';
import { APP_NAME } from './const/default';

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
        <Analytics />
      </AppContainer>
    </DAppProvider>
  );
}

export default App;
