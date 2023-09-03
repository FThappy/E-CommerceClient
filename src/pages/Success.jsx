import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Announcenment from '../components/Announcenment';
import Footer from '../components/Footer';

const Container = styled.div``;

const Img = styled.img`
  margin-left: 32rem;
`

const Success = () => {

  return (
    <Container>
      <Navbar />
      <Announcenment />
      <Img src="https://i.pinimg.com/564x/78/54/8e/78548e5d83efd6facaa23b1d66dc2bba.jpg" />
      <Footer />
    </Container>
  );
}

export default Success