import { Publish } from '@mui/icons-material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { publicRequest } from '../requestMethods';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";



const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1380&t=st=1689672305~exp=1689672905~hmac=56d97e8e62807fd3b35e9c33bf537c34cea02a3600ec65e75daadd95228f559c")
    center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
    width: 40%;
    padding: 1.3rem;
    background-color: white;

`
const Form = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    font-weight: 300 ;
    font-size: 1.5rem;

`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 1.3rem 0.8rem 0rem 0rem;
    padding: 0.8rem;
`
const Agreement = styled.span`
    font-size: 0.8rem;
    margin: 1.3rem 0rem;
`
const Upload = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 12rem;
`;
const UploadLab = styled.label``;
const UploadInput = styled.input``;
const UploadImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 0.65rem;
  object-fit: cover;
  margin-left: 1.25rem;
`;
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 1rem 1.3rem;
    background-color: teal;
    color:white;
    cursor: pointer;
 
`
const NotificationWrapper = styled.div`
  position: fixed;
  bottom: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  padding: 0.625rem;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
  z-index: 9999;

  &.notification-hidden {
    opacity: 0;
  }
`;

const Register = () => {


  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [birth, setBirth] = useState(new Date());
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [hideSuccessAlert, setHideSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [hideFailAlert, setHideFailAlert] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
   const handleBirth = (e) => {
     const selectedDate = new Date(e.target.value);
     setBirth(selectedDate);
   };
   console.log(inputs,birth)
    const handleClick1 = () => {

      const img =
        "https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png";


      const item = {
        ...inputs,
        birth: birth,
        img: img,
      };
      const RegisterUser = async () => {
        try {
          const res = await publicRequest.post("/auth/register", item);
        } catch (err) {
          console.log(err);
        }
      };
      RegisterUser();
      navigate("/login")
    };
    const handleClick = (e) => {
      e.preventDefault();
      if(inputs.username&&inputs.email&&inputs.password&&inputs.phone&&inputs.address){
      if (file) {
        const filename = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log("File available at", downloadURL);
              const item = {
                ...inputs,
                birth: birth,
                img: downloadURL,
              };
              const RegisterUser = async () => {
                try {
                  const res = await publicRequest.post("/auth/register",item);
                } catch (err) {
                  console.log(err);
                }
              };
              RegisterUser();

              // console.log({ ...inputs, img: downloadURL, categories: cat, size : size , color : color });
              navigate("/login");
            });
          }
        );
      } else {
        handleClick1();
      }
    }
    else{
      setShowFailAlert(true);
      setTimeout(() => {
        setHideFailAlert(true);
      }, 5000);
      setHideFailAlert(false);
    }
    };


  return (
    <Container>
      <Wrapper>
        <Title>Create An Account</Title>
        <Form>
          <Upload>
            <UploadImg
              src={
                file
                  ? "https://firebasestorage.googleapis.com/v0/b/shop-19fe0.appspot.com/o/t%E1%BA%A3i%20xu%E1%BB%91ng.png?alt=media&token=94863727-e665-436e-aa84-74e3b6387e7f"
                  : "https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png"
              }
              alt="a"
            />
            <UploadLab htmlFor="file">
              <Publish sx={{ fontSize: "2.5rem !important" }} />
            </UploadLab>
            <UploadInput
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </Upload>
          <Input
            name="username"
            placeholder="UserName*"
            onChange={handleChange}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email*"
            onChange={handleChange}
          />
          <Input
            name="password"
            placeholder="Password*"
            onChange={handleChange}
          />
          <Input
            placeholder="Birth Ex:1975-04-30.........."
            onChange={handleBirth}
          />
          <Input name="phone" placeholder="Phone*" onChange={handleChange} />
          <Input
            name="address"
            placeholder="Address*"
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
      {showFailAlert && (
        <NotificationWrapper
          className={hideFailAlert ? "notification-hidden" : ""}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
              You need to fill in all the required information or double-check
              the provided information. — check it out!
            </Alert>
          </Stack>
        </NotificationWrapper>
      )}
    </Container>
  );
}

export default Register