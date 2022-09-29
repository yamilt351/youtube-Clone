import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

const Container = styled.div`
margin: 8px;;
display:flex;
justify-content:space-between;
flex-wrap:wrap;
`
function Home({type}) {
  const [video, setVideo]= useState([])

  useEffect( ()=>{
    const fetchVideo= async ()=>{
      const response = await axios.get(`/videos/${type}`);
      setVideo(response.data)
    }
    fetchVideo()
  } ,[type])
  return (
    <Container>
      {video.map((videos)=>(
        <Card  key={videos._id} videos={videos}/> //pasamos videos como prop y lo enviamos a card 
        
      ))}
      
    </Container>
  );
}

export default Home