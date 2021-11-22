import "./App.css";
import styled from "styled-components";
import { Navbar, Timer } from "./components/organisms";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #c0392b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <div>
      <header className="App-header">
        <Navbar />
      </header>
      <Container>
        <Timer />
      </Container>
    </div>
  );
};

export default App;
