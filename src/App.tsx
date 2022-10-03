import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { salsaEcosystem, IActiveProject } from './const/ecosystem';

const AppContainer = styled.main`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

function App() {
  const [ecosystem, setEcosystem] = useState<IActiveProject[]>();

  useEffect(() => {
    setEcosystem(salsaEcosystem);
  }, []);

  return (
    <AppContainer>
      <NavBar />
      {ecosystem ? <Analytics ecosystem={ecosystem} setEcosystem={setEcosystem} /> : 'loading'}
    </AppContainer>
  );
}

export default App;
