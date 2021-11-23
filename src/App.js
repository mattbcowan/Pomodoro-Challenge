import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Login, Registration, Dashboard, Reset } from "./pages";
import { Navbar } from "./components/organisms";

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
      <Navbar />
      <Container>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Registration />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Container>
    </AppContainer>
  );
};

export default App;
