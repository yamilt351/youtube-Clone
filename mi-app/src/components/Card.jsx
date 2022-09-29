import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js"

const Container = styled.div`
  width: ${(props) => (props.type !== "sm" && "360px")};
  cursor: pointer;
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => props.type === "sm" && "flex"};
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "50%" : "100%")};
  height: ${(props) => (props.type === "sm" ? "100px" : "202px")};
  background-color: #999;
  flex:1;
`;

const Details = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 12px;
  flex:1;
`;

const ChnImg = styled.img`
  width: ${(props) => (props.type === "sm" ? "0px" : "36px")};
  height: ${(props) => (props.type === "sm" ? "0px" : "36px")};
  border-radius: 50%;
  background-color: #999;
`;
const Text = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
  margin: 10px 0;
`;

const ChanelName = styled.h2`
  font-size: 14px;
  color: ${({theme}) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({theme}) => theme.textSoft};
`;

function Card({type,videos}) {
   const [channel, setChannel] = useState({});

   useEffect(() => {
     const fetchVideo = async () => {
       const response = await axios.get(`/users/find/${videos.userId}`);
       setChannel(response.data);
     };
     fetchVideo();
   }, [videos.userId]);
   
  return (
    <Link to={`/video/${videos._id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <Image type={type} src={videos.imgUrl} />
        <Details type={type}>
          <ChnImg type={type} src={channel.image} />
          <Text>
            <Title>{videos.title}</Title>
            <ChanelName>
              {channel.username} - {channel.subscribers}
            </ChanelName>
            <Info>
              {videos.views} views - {format(videos.timestamps)}
            </Info>
          </Text>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
