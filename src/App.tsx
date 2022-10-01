import './App.css';
import NavBar from './components/NavBar/NavBar';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Analytics from './pages/Analytics/Analytics';

function App() {
  return (
    <div className="app">
      <NavBar />
      <Analytics />
    </div>
  );
}

export default App;
