import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { addWishlist, removeWishlist } from '../redux/wishlistRedux';


const Image = styled.img`
    height: 75%;
    z-index: 2;
`
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: opacity 0.3s ease-in-out;
  cursor: pointer;
`;
const Icons = styled.div`
  display: flex;
`
const Icon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.65rem;
  transition: all 0.5s ease;
  &:hover {
    background-color: #89dafa;
    transform: scale(1.1);
  }
`;
const Price = styled.h1`
  color: white;
  font-size: 3rem;
  margin-top: 3rem;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    color: #89dafa;
    transform: scale(1.1);
  }
`;
const Name = styled.h2`
  color: #e79119;
  font-size: 1.5rem;
  margin-top: 2rem;
  transition: opacity 0.3s ease-in-out;
  padding-left: 1rem;
  &:hover {
    color: #89dafa;
  }
`;

const Container = styled.div`
  flex: 1;
  margin: 0.4rem;
  min-width: 22rem;
  height: 22rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
  @media only screen and (max-width: 1400) {
    min-width: 19.5rem;
    margin: 0.2rem;
  }
  @media only screen and (max-width: 720px) {
    min-width: 19.5rem;
    margin: 0.2rem;
  }
  @media only screen and (max-width: 550px) {
    min-width: 21.5rem;
    margin: 0.2rem;
  }
`;


const Product = ({item}) => {

  const [wishlist, setWishlist] = useState(item.wishlist);


  const dispatch = useDispatch()

  const handleWishlist = ()=>{
    dispatch(addWishlist({...item}))
    setWishlist(true);
  }
  const handleRemoveWishlist = () => {
    dispatch(removeWishlist(item._id));
    setWishlist(false);
  };

  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Icons>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <ShoppingCartOutlined />
            </Link>
          </Icon>
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            {wishlist ? (
              <FavoriteBorderOutlined
                style={{ color: "pink" }}
                onClick={handleRemoveWishlist}
              />
            ) : (
              <FavoriteBorderOutlined onClick={handleWishlist} />
            )}
          </Icon>
        </Icons>
        <Price>${item.price}</Price>
        <Name>{item.title}</Name>
      </Info>
    </Container>
  );
}

export default Product