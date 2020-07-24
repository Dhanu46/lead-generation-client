import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { API } from "../../backend";
import * as faceapi from "face-api.js";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

const Button = styled.button`
  background-color : #4CAF50;
  border : none;
  color : white;
  text-align : center;
  padding : 2% 3%;
  text-decoration : none;
  display : inline-box;
  font size : 16px;
`;

function VideoCallCompo() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  const models = process.env.PUBLIC_URL + "models";

  useEffect(() => {
    async function faceDetection() {
      try {
        console.log("models loaded");
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(models),
          faceapi.nets.faceLandmark68Net.loadFromUri(models),
          faceapi.nets.faceRecognitionNet.loadFromUri(models),
        ]);
      } catch (ex) {
        console.log("something error occured", ex);
      }
    }
    faceDetection();
    socket.current = io.connect(`${API}`);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, [models]);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            // username: "sultan1640@gmail.com",
            // credential: "98376683"
          },
          {
            urls: "turn:numb.viagenie.ca",
            // username: "sultan1640@gmail.com",
            // credential: "98376683"
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  function drawFace() {
    console.log("detecting Face");
    const canvas = faceapi.createCanvasFromMedia(Video);
    document.body.append(canvas);
    const displaySize = { width: Video.width, height: Video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(Video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video onPlay={drawFace} playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video onPlay={drawFace} playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} Wants go live with you</h1>
        <Button onClick={acceptCall}>Go Live</Button>
      </div>
    );
  }

  return (
    <Container>
      <Row>
        {UserVideo}
        {PartnerVideo}
      </Row>
      <Row>
        {Object.keys(users).map((key) => {
          if (key === yourID) {
            return null;
          }
          return <Button onClick={() => callPeer(key)}>Go live</Button>;
        })}
      </Row>
      <Row>{incomingCall}</Row>
    </Container>
  );
}

export default VideoCallCompo;
