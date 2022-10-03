import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { salsaEcosystem, IActiveProject } from './const/ecosystem';

function App() {
  const [ecosystem, setEcosystem] = useState<IActiveProject[]>();

  useEffect(() => {
    setEcosystem(salsaEcosystem);
  }, []);

  const AppContainer = styled.main`
    display: flex;
    height: 100vh;
    width: 100vw;
    flex-direction: column;
  `;

  return (
    <AppContainer>
      <NavBar />
      {ecosystem ? <Analytics ecosystem={ecosystem} setEcosystem={setEcosystem} /> : 'loading'}
    </AppContainer>
  );
}

export default App;
