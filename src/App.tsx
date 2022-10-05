import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import NavBar from './components/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { ICasinoEvent } from './const/ecosystem';
import useTzkt from './hooks/useTzkt';

const AppContainer = styled.main`
  display: flex;
  height: 100vh;
  flex-direction: column;
`;

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ecosystem, setEcosystem] = useState<ICasinoEvent[]>();
  const { events } = useTzkt();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setEcosystem(events);
  }, [events]);

  return (
    <AppContainer>
      <NavBar />
      <Analytics ecosystem={events} setEcosystem={setEcosystem} />
    </AppContainer>
  );
}

export default App;
