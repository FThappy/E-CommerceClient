import React, { useEffect, useState } from 'react'
import {GrAdd} from 'react-icons/gr'
import { MdRemove } from "react-icons/md";
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcenment from '../components/Announcenment'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";



const Container = styled.div`
    
`
const Wrapper = styled.div`
  padding: 3.2rem;
  display: flex;
  margin: 1rem;
  ${mobile({ padding: "0.5rem", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
    flex:1;
`
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0rem 3.2rem;
  ${mobile({ padding: "0.7rem" })}
`;
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 1.3rem 0rem;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 2.5rem;
`
const FilterContainer = styled.div`
  width: 50%;
  margin: 1.8rem 0rem;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 1.3rem;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    border: 1px solid black;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0px 5px ;
    cursor: pointer;
`
const FilterSize = styled.select`
    border-radius: 2rem;
    margin-left: 0.6rem ;
    padding: 0.3rem ;
`
const FilterSizeOption = styled.option`
    
`
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 1.9rem ;
    height: 1.9rem;
    border-radius: 0.6rem;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
  padding: 1rem;
  border: none;
  background-color: teal;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #50ca50;
  }
`;
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

const ProductItem = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [quantity, setQuantity] = useState(1);


  const [product,setProduct] = useState({})
  const [color, setColor] = useState("");
  const [size, setSize] = useState("S");
  const dispatch = useDispatch()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [hideSuccessAlert, setHideSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [hideFailAlert, setHideFailAlert] = useState(false);



  useEffect(()=>{
    const getProduct = async ()=>{
      try{
        const res = await  publicRequest.get("/product/find/"+id)
        setProduct(res.data)
      }catch(err){
      console.log(err)
    } 
    }
    getProduct();
  },[id])

  const handleQuantity = (e)=>{
    if(e==="dec"){
      quantity>1&&setQuantity(quantity-1)
    }
    if(e==="inc"){
      quantity<product.quantity&&setQuantity(quantity+1)
    }
  }

  const handleClick = ()=>{
    //update cart
    if(color&&size){
      dispatch(addProduct({ ...product, quantity, color, size }));
      setShowSuccessAlert(true);
      setTimeout(() => {
        setHideSuccessAlert(true); 
      }, 5000); 
      setHideSuccessAlert(false);
    }else{
    setShowFailAlert(true);
    setTimeout(() => {
      setHideFailAlert(true);
    }, 5000); 
    setHideFailAlert(false);
  }
  }


  return (
    <Container>
      <Navbar />
      <Announcenment />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color : </FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <MdRemove
                onClick={() => handleQuantity("dec")}
                style={{ cursor: "pointer" }}
              />
              <Amount>{quantity}</Amount>
              <GrAdd onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>Add To Cart</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
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
              You need to select the size or color — check it out!
            </Alert>
          </Stack>
        </NotificationWrapper>
      )}
    </Container>
  );
}

export default ProductItem