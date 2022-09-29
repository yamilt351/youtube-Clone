import React, { useState } from "react";
import styled from "styled-components";
import { MdPersonPin, MdOutlineSearch, MdVideoCall } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Upload from "./Upload";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 8px; */
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 5px;
`;
const Input = styled.input`
  border: none;
  width: 420px;
  padding: 5px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
`;

const Login = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const User = styled.div`
 color: ${({ theme }) => theme.text};
 display: flex;
 align-items: center;
 font-size: 26px;
`;
const Avatar = styled.img`
  height: 33px;
  width: 33px;
  border-radius: 10px;
  cursor: pointer;
  background-color: #3ea6ff ;
  margin: 0px 12px;
`;

function Navbar() {
  const navigate= useNavigate()
  const [open, setOpen]= useState(false);
    const [query, setQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            ></Input>
            <MdOutlineSearch onClick={() => navigate(`/search?q=${query}`)} />
          </Search>
          {currentUser ? (
            <User>
              <MdVideoCall onClick={() => setOpen(true)} />
              <Avatar src={currentUser.image} />
            </User>
          ) : (
            <Link to="/signin">
              <Login>
                <MdPersonPin />
                Login
              </Login>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
