import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({theme}) => theme.text};
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({theme}) => theme.textSoft};
  margin: 20px 5px;
`;

const Text = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({theme}) => theme.text};
`;

function Comment({ comment }) {
  const [channel, setChannel] = useState();

  useEffect(()=>{
    const fetchComments = async ()=>{
      const data = await axios.get(`/users/find/${comment.userId}`)
      setChannel(data.data) 
    }
    fetchComments()
  },[comment.userId])

  return (
    <Container>
      <Avatar src={channel?.image} />
      <Details >
        <Name>
          {channel?.username}
          <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
          {comment.description}
        </Text>
      </Details>
    </Container>
  );
}

export default Comment;
