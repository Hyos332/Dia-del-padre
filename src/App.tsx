import FathersDayMessage from './components/FathersDayMessage';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', 'Arial', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    min-height: 100vh;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <FathersDayMessage />
    </>
  );
}

export default App;
