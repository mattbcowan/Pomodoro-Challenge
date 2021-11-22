import "./App.css";
import styled from "styled-components";
import { Navbar, Timer } from "./components/organisms";

const AppContainer = styled.div`
  height: 100vh;
  background-color: #c0392b;
`;

const Container = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <AppContainer>
      <header className="App-header">
        <Navbar />
      </header>
      <Container>
        <Timer />
      </Container>
    </AppContainer>
  );
};

export default App;
