import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card.jsx";

const Wrapper = styled.div`
  flex: 2;
`;

function Recommendation({ tags }) {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axios.get(`/videos/tags?tags=${tags}`);
      setVideo(response.data);
    };
    fetchTags();
  }, [tags]);

  return (
    <Wrapper>
      {video.map((videos) => (
        <Card key={videos._id} type="sm" videos={videos} />
      ))}
    </Wrapper>
  );
}

export default Recommendation;
