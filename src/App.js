import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Login, Registration, Dashboard, Reset, Timer } from "./pages";
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
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route exact path="/" element={<Timer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </AppContainer>
  );
};

export default App;
