import styled from 'styled-components';
import NavBar from './components/NavBar';
import Analytics from './pages/Analytics/Analytics';

const AppContainer = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (
    <AppContainer>
      <NavBar />
      <Analytics />
    </AppContainer>
  );
}

export default App;
