import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
function Search() {
  const [videos, setVideos] = useState([]);
  const query= useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`/videos/search${query}`);
      setVideos(response.data);
    };
    fetchVideos();
  }, [query]);
  return <Container>
{videos.map((video)=>(
  <Card key={video._id}  videos={video}/> 
))}

  </Container>;
}

export default Search;
