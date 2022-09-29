import React from "react";
import {
  MdExplore,
  MdFilterNone,
  MdHelpOutline,
  MdHome,
  MdLiveTv,
  MdLocalMovies,
  MdOutlineBrightnessMedium,
  MdOutlinedFlag,
  MdOutlineHistory,
  MdOutlineLibraryMusic,
  MdOutlineSettings,
  MdOutlineSportsBaseball,
  MdPersonPin,
  MdSportsEsports,
  MdSubscriptions,
  MdTextSnippet,

} from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.bg};
  height: 100vh;
  color: ${({theme}) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover {
    background-color: ${({theme}) => theme.soft};
  }
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme}) => theme.soft};
`;

const Login = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
function Menu({darkMode, setDark}) {
   const { currentUser } = useSelector((state) => state.user);
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <MdHome />
            Home
          </Item>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Link
            to="/trend"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Item>
              <MdExplore />
              Explore
            </Item>
          </Link>
        </Link>
        <Link
          to="/subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MdSubscriptions />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <MdFilterNone />
          Library
        </Item>
        <Item>
          <MdOutlineHistory />
          History
        </Item>
        <Hr />
        {currentUser ? ("") : (
          <Link to="/signin">
            <Login>
              <MdPersonPin />
              Login
            </Login>
          </Link>
        )}
        <Item>
          <MdOutlineLibraryMusic />
          Music
        </Item>
        <Item>
          <MdOutlineSportsBaseball />
          Sports
        </Item>
        <Item>
          <MdSportsEsports />
          Gaming
        </Item>
        <Item>
          <MdLocalMovies />
          Movies
        </Item>
        <Item>
          <MdTextSnippet />
          News
        </Item>
        <Item>
          <MdLiveTv />
          Live
        </Item>
        <Hr />
        <Item>
          <MdOutlineSettings />
          Settings
        </Item>
        <Item>
          <MdOutlinedFlag />
          Report
        </Item>
        <Item>
          <MdHelpOutline />
          Help
        </Item>
        <Item onClick={() => setDark(!darkMode)}>
          <MdOutlineBrightnessMedium />
          {darkMode ? "Light mode" : "Dark mode"}
        </Item>
      </Wrapper>
    </Container>
  );
}


export default Menu;
