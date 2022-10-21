import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Signin from "./Pages/Signin";
import Video from "./Pages/Video";
import { darkTheme, lightTheme } from "./utils/Theme";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bgLighter};
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bgLighter}; ;
`;
function App() {
  const [darkMode, setDark] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? lightTheme : darkTheme}>
      <Container className="App">
        <Router>
          <Menu darkMode={darkMode} setDark={setDark} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" />
                <Route index element={<Home type="random" />}></Route>
                <Route path="/trend" element={<Home type="trend" />}></Route>
                <Route
                  path="/subscriptions"
                  element={<Home type="sub" />}
                ></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/signin" element={<Signin />}></Route>
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
