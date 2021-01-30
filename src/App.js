import './App.css';

import { ContextProvider } from './context/data.context';

import Section from "./components/Section";

function App() {
  return (
    <div className="main">
      <ContextProvider>
        <Section />
      </ContextProvider>
    </div>
  );
}

export default App;
