import {  Send } from '@mui/icons-material'
import React, { useState } from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { publicRequest, userRequest } from "../requestMethods";
import { useSelector } from 'react-redux';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 4.4rem ;
    margin-bottom: 1.3rem;
`
const Desc = styled.div`
  font-size: 1.3rem;
  font-weight: 300;
  margin-bottom: 1.3rem;
  ${mobile({ textAlign: "center" })}
`;
const InputContainer = styled.div`
  width: 35%;
  height: 2.5rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;
const Input = styled.input`
height: 85%;
border: none;
flex: 8;
padding-left: 1.3rem ;
`
const Button = styled.button`
    flex: 1;
    border: none;
    background-color: teal;
    color: white;
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

const Newsletter = () => {


  const [inputs, setInputs] = useState({});
  const user = useSelector((state)=>state.user.currentUser)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [hideSuccessAlert, setHideSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [hideFailAlert, setHideFailAlert] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e)=>{
    if(user){
    const postFeedBack = async()=>{
      try{
        const item ={
          ...inputs,
          userId : user.username,
          email: user.email,
        }
        await userRequest.post("/feedback/"+user._id,item)
        setShowSuccessAlert(true);
        setTimeout(() => {
          setHideSuccessAlert(true);
        }, 5000);
        setHideSuccessAlert(false);
      }catch(err){
        console.log(err)
      }
    }
   
      postFeedBack();
  }
     else {
      setShowFailAlert(true);
      setTimeout(() => {
        setHideFailAlert(true);
      }, 5000);
      setHideFailAlert(false);
    }
  }

    
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favorite products.</Desc>
      <InputContainer>
        <Input name="title" placeholder=".........." onChange={handleChange} />
        <Button onClick={handleClick}>
          <Send />
        </Button>
      </InputContainer>
      {showSuccessAlert && (
        <NotificationWrapper
          className={hideSuccessAlert ? "notification-hidden" : ""}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          </Stack>
        </NotificationWrapper>
      )}
      {showFailAlert && (
        <NotificationWrapper
          className={hideFailAlert ? "notification-hidden" : ""}
        >
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">
              You need to log in to perform this function.
            </Alert>
          </Stack>
        </NotificationWrapper>
      )}
    </Container>
  );
}

export default Newsletter