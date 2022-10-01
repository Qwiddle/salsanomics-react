import './App.css';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Analytics from './pages/Analytics/Analytics';
import { salsaEcosystem, IActiveProject } from './const/ecosystem';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
