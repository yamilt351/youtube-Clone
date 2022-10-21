import React from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {useDispatch} from "react-redux";
import { loginError, loginStart, loginSuccess } from "../Redux/userSlice";
// import { auth,provider } from "../firebase";
// import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 900;
`;

const SubTitle = styled.h2`
  font-size: 18px;
`;

const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 3px;
  width: 100%;
`;

const Button = styled.button`
  width: 50%;
  padding: 5px;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

function Signin() {
  const [formData, setFormData]=useState({
    username:"",
    email:"",
    password:"",
  })
const dispatch= useDispatch();
const navigate=useNavigate();
  const { username, password, email } = formData;
  const handleSignup = async (e) => {
    e.preventDefault();
    if (username !== "" && email !== "" && password !== "") {
      const user = {
        username,
        email,
        password,
      };
      try {
        await axios
          .post("/auth/signup", user)
          .then(({ data }) => console.log(data));

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      const user = {
        username,
        password,
      };
      dispatch(loginStart())
      try {
        const res = await axios
        .post("/auth/signin", user)
        dispatch(loginSuccess(res.data));
        navigate("/");
          console.log("loged");
        } catch (error) {
          console.log(error);
          dispatch(loginError);
        }
      }
    };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue in the app</SubTitle>
        <Input
          placeholder="Username"
          type="text"
          name="username"
          onChange={handleChange}
          required
        />
        <Input
        name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button onClick={handleSignin}>Sign In</Button>

        <Title>Or</Title>
       
        <Input
          placeholder="Username"
          name="username"
          type="text"
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          onChange={handleChange}
          required
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          required
        />
        <Button type="submit" onClick={handleSignup}>
          Sign Up
        </Button>
      </Wrapper>
    </Container>
  );
}

export default Signin;
