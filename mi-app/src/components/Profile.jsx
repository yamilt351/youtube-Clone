import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 400px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const ButtonL = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: red;
  color: black;
`;
const Label = styled.label`
  font-size: 14px;
`;

const Profile = ({ setOpenProfile }) => {

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const [img, setImg] = useState(undefined);

  const [imgPerc, setImgPerc] = useState(0);

  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgage"
          ? setImgPerc(Math.round(progress))
          : setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

    useEffect(() => {
      img && uploadFile(img, "image");
    }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${currentUser._id}`, { ...inputs });
      setOpenProfile(false);
      res.status === 200 && navigate(`/`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleLogout=()=>{
    dispatch(logout())
    setOpenProfile(false);
    navigate(`/`);
  }
  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenProfile(false)}>X</Close>
        <Title>Profile</Title>
        <Label>Profile picture:</Label>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            name="image"
            onChange={((e) => setImg(e.target.files[0]))}
          />
        )}
        <Label> change your name</Label>
        {console.log(currentUser._id)}
        <Input
          type="text"
          placeholder="name"
          name="username"
          onChange={handleChange}
        />
        <Button onClick={handleUpload}>Upload</Button>
        <ButtonL onClick={handleLogout}>LogOut</ButtonL>
      </Wrapper>
    </Container>
  );
};

export default Profile;
