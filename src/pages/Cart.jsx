import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import Announcenment from '../components/Announcenment'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { Add, Remove } from '@mui/icons-material'
import { mobile } from "../responsive";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux' 
import StripeCheckout from 'react-stripe-checkout'
import { publicRequest, userRequest } from "../requestMethods";
import { removeProduct } from "../redux/cartRedux";


const Container = styled.div`
    
`
const Wrapper = styled.div`
  padding: 1.3rem;
  ${mobile({ padding: "0.7rem" })}
`;
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.3rem;
`
const TopButton = styled.button`
  padding: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline ;
    cursor: pointer;
    font-weight: 600;
    margin: 0rem 0.7rem;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
  margin-left: 10rem;
  @media only screen and (max-width: 850px) {
    margin-left: 0;
  }
  ${mobile({ marginLeft: "0" })}
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  margin-top: 0.4rem;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
    flex : 2;
    display: flex;
`;
const Image = styled.img`
    width: 12.5rem;
`;
const Details = styled.div`
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 70%;
    background-color : ${props=>props.color};
    border: 1px solid black;
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display :  flex;
    align-items: center;
    margin-bottom: 1.3rem;
`
const ProductAmount = styled.div`
  font-size: 1.5rem;
  margin: 0.4rem;
  ${mobile({ margin: "0.3rem 1rem" })}
`;
const ProductPrice = styled.div`
  font-size: 1.9rem;
  font-weight: 600;
  ${mobile({ marginBottom: "1.3rem" })}
`;
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 0.1rem;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgrey;
  border-radius: 0.8rem;
  padding: 1.3rem;
  height: 50vh;
  margin-left: 0.5rem;
  margin-right: 10rem;
  @media only screen and (max-width: 850px) {
    margin-right: 0;
  }
  ${mobile({ marginRight: "0" })}
`;
const SummaryTitle = styled.h1`
font-weight:600;
`
const SummaryItem = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "1.5rem"};
`;
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    background-color: black;
    color : white;
    font-weight: 600;
    cursor: pointer;

    `

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector(state=>state.cart)
  const wishlist = useSelector((state) => state.wishlist);

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const item = cart.products.map((item) => ({
    productId: item._id,
    productImg: item.img,
    productName : item.title,
    size : item.size,
    color : item.color,
    price : item.price,
    quanity: item.quantity,
  }));
 


  const onToken = (token)=>{

    setStripeToken(token)

  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        const order = {
          userId: user._id,
          products: item,
          amount: cart.total,
          address: user.address,
        };
        console.log(order);
        const postOrder = async () => {
          try {
            const res = await userRequest.post("/order", order);
          } catch (err) {
            console.log(err);
          }
        };
        postOrder();
        dispatch(removeProduct(cart));
        // navigate("/success", { state: { data: res.data } });
      } catch(error) {
        console.log(error)
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);


  return (
    <Container>
      <Navbar />
      <Announcenment />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/products" tyle={{ textDecoration: "none" }}>
            <TopButton>Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <Link to="/cart" tyle={{ textDecoration: "none" }}>
              <TopText>Shopping Bag({cart.quantity})</TopText>
            </Link>
            <Link to="/wishlist" tyle={{ textDecoration: "none" }}>
              <TopText>Your Wishlish ({wishlist.quantity})</TopText>
            </Link>
          </TopTexts>
          <TopButton type="filled">CheckOut Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((item) => (
              <Product key={item._id}>
                <ProductDetail>
                  <Image src={item.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {item.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {item._id}
                    </ProductId>
                    <ProductColor color={item.color} />
                    <ProductSize>
                      <b>Size:</b> {item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{item.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>$ {item.price * item.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 6</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -6</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name={user?.username}
              image={user?.img}
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey="pk_test_51NZxuNGduudlmOXIV2hfgTQguCvjtsNoDq6Hl88xnF3mksB84caTgZkwHd59lOjt3fNS2OmxR9hDJMwfo3O09Pyd00XUFLsixa"
            >
              <Button>CHECKOUT NOW</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}

export default Cart