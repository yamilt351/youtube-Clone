import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiListPlus, BiShare } from "react-icons/bi";
import {
  MdThumbDownOffAlt,
  MdThumbDown,
  MdThumbUpOffAlt,
  MdThumbUp,
  MdRestoreFromTrash,
  MdEdit,
} from "react-icons/md";
import styled from "styled-components";
// import Card from "../components/Card";
import Comments from "../components/Comments";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../Redux/videoSlice";
import { format } from "timeago.js";
import { suscription } from "../Redux/userSlice";
import Recommendation from "../components/Recommendation";
import UpdateVideoInfo from "../components/updateVideoInfo";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  margin: 10px;
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 5px;
  color: ${({ theme }) => theme.text};
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSoft};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.textSoft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const ImageChanell = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #999;
`;

const ChannelTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ChannelDescription = styled.p`
  font-size: 14px;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 12px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
`;

const Subscribe = styled.button`
  background-color: red;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  background-color: ${({ theme }) => theme.textSoft};
  width: 800px;
  height: 450px;
`;

function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [OpenVideoInfo, setOpenVideoInfo] = useState(false);
  const [channel, setChannel] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );
        setChannel(channelRes.data);

        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [path, dispatch]);

  useEffect(() => {
    const fetchView = async () => {
      try {
        const videoRes = await axios.get(`/videos/find/${path}`);

        const channelRes = await axios.put(`/videos/view/${videoRes.data._id}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchView();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(like(currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSuscription = async () => {
    currentUser.subscribedUser.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(suscription(channel._id));
  };

  const handleDelete = async () => {
    const deletePost = await axios.delete(`/videos/${currentVideo._id}`);
    navigate(`/`);
    return deletePost;
  };
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls />
        </VideoWrapper>
        {console.log(channel?._id)}
        <Title>
          {currentVideo?.title}{" "}
          <MdEdit onClick={() => setOpenVideoInfo(true)} cursor="pointer" />
        </Title>
        <Detail>
          <Info>
            {currentVideo?.views} views -{format(currentVideo?.timestamps)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.like?.includes(currentUser?._id) ? (
                <MdThumbUp />
              ) : (
                <MdThumbUpOffAlt />
              )}
              {currentVideo?.like?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislike?.includes(currentUser?._id) ? (
                <MdThumbDown />
              ) : (
                <MdThumbDownOffAlt />
              )}
              {currentVideo?.dislike?.length}
            </Button>
            <Button>
              <BiShare />
              Share
            </Button>
            <Button>
              <BiListPlus />
              Save
            </Button>
            {currentUser ? (
              <Button>
                Delete
                <MdRestoreFromTrash onClick={handleDelete} />
              </Button>
            ) : (
              ""
            )}
          </Buttons>
        </Detail>
        <Hr />
        <Channel>
          <ChannelInfo>
            <ImageChanell src={channel?.image} />
            <ChannelDetail>
              <ChannelTitle> {channel?.username}</ChannelTitle>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <ChannelDescription>
                {" "}
                {currentVideo?.description}
              </ChannelDescription>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSuscription}>
            {" "}
            {currentUser?.subscribedUser?.includes(channel?._id)
              ? " SUSCRIPTO"
              : "SUSCRIBIRSE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>

      <Recommendation tags={currentVideo?.tags} />
      {OpenVideoInfo && (
        <UpdateVideoInfo
          setOpenVideoInfo={setOpenVideoInfo}
          OpenVideoInfo={OpenVideoInfo}
        />
      )}
    </Container>
  );
}

export default Video;
