import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Analytics from './pages/Analytics/Analytics';
import { salsaEcosystem, IActiveProject } from './const/ecosystem';

function App() {
  const [ecosystem, setEcosystem] = useState<IActiveProject[]>();

  useEffect(() => {
    setEcosystem(salsaEcosystem);
  }, []);

  return (
    <div className="app">
      <NavBar />
      {ecosystem ? <Analytics ecosystem={ecosystem} /> : 'loading'}
    </div>
  );
}

export default App;
