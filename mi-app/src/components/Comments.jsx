import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../Redux/userSlice";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  background-color: transparent;
  width: 100%;
  padding: 4px;
  outline: none;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
  background-color: red;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [description, setDescription] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/comments/${videoId}`);
      setComments(response.data);
    };
    fetchComments();
  }, [videoId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const postComments = await axios.post(`/comments/`, {
      description,
      userId: currentUser._id,
      videoId: videoId,
    });
    dispatch(comment(postComments.data))
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.image}></Avatar>
        <Input
          placeholder="make a comment"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
        <Button onClick={handleCommentSubmit} >Comment</Button>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
