import './App.css';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';

function App() {
  return (
    <div className="App container">
      <Header/> {/*will use context here in future for showing name*/}
      <Hero/>
    </div>
  );
}

export default App;
