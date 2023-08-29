import React from 'react';
import styled from 'styled-components';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";


const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease-in-out;
  ${mobile({ height: "43vh" })}
`;
const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column ;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  margin-bottom: 1.5rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
`;
const Button = styled.button`
  border: none;
  padding: 0.5rem;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const Container = styled.div`
  flex: 1;
  margin: 0.2rem;
  height: 70vh;
  position: relative;
  &:hover ${Info} {
    opacity: 1;

  }
  &:hover ${Image}{
    opacity: 0.5;
  }
  &:hover ${Title}, &:hover ${Button} {
    opacity: 1;
    visibility: visible;
    
  }
`;

const CategoryItem = ({item}) => {
    return (
      <Container>
        {item.cat ? (
        <Link to={`/products/${item.cat}`}>
          <Image src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            <Button>Buy Now</Button>
          </Info>
        </Link>)
        :
        (
        <Link to={`/products`}>
          <Image src={item.img} />
          <Info>
            <Title>{item.title}</Title>
            <Button>Buy Now</Button>
          </Info>
        </Link>)
        }
      </Container>
    );
}

export default CategoryItem;
