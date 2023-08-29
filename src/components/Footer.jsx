import { Facebook, GitHub, Instagram, MailOutline, Phone, Pinterest, Room } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  flex : 1;
  display: flex;
  flex-direction: column;
  padding: 1.3rem;
`
const Logo = styled.h1`
    
`
const Desc = styled.p`
    margin: 1.3rem 0rem;
`
const SocialContainer= styled.div`
    display:flex;
`
const SocialIcon = styled.div`
    width: 2.5rem ;
    height: 2.5rem;
    border-radius: 50%;
    color:white;
    background-color: #${props=> props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1.3rem;
`

const Center = styled.div`
  flex: 1;
  ${mobile({ display: "none" })}
`;
const Title = styled.h3`
    font-size: 1.5rem;
    margin: 1.9rem;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 0.4rem;
`
const Right = styled.div`
  flex: 1;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 1.3rem;
  display: flex;
  align-items: center;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>
          Bear
          <img
            src="https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png"
            alt="a"
            style={{ width: "5%" }}
          />
        </Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="171515">
            <GitHub />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <Link to="/" style={{ textDecoration: "none", width: "50%" }}>
            <ListItem>Home</ListItem>
          </Link>
          <Link to="/cart" style={{ textDecoration: "none", width: "50%" }}>
            <ListItem>Cart</ListItem>
          </Link>
          <Link
            to="/products/men"
            style={{ textDecoration: "none", width: "50%" }}
          >
            <ListItem>Man Fashion</ListItem>
          </Link>
          <Link
            to="/products/women"
            style={{ textDecoration: "none", width: "50%" }}
          >
            <ListItem>Woman Fashion</ListItem>
          </Link>
          <Link to="/products" style={{ textDecoration: "none", width: "50%" }}>
            <ListItem>Products</ListItem>
          </Link>
          <Link to="/profile" style={{ textDecoration: "none", width: "50%" }}>
            <ListItem>My Account</ListItem>
          </Link>
          <Link to="/wishlist" style={{ textDecoration: "none", width: "50%" }}>
            <ListItem>Wishlist</ListItem>
          </Link>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Hai Ba Trung , Ha Noi , Viet
          Nam
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> 012345678910
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          umbalavungoimora@example.com
        </ContactItem>
      </Right>
    </Container>
  );
}

export default Footer