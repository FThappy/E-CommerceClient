
import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {sliderItems} from "../data"
import { mobile } from "../responsive";
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius :50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0 ;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    margin: auto ;
    cursor: pointer;
    opacity: 0.5; //làm mờ
    z-index: 2 ;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #${props =>props.bg};
`
const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  padding: 4rem;
`;
const Image = styled.img`
height: 80%;
width: 90%;
  
`
const InfoContainer = styled.div`
  flex: 1;
  padding: 4rem;
`;
const Title = styled.h1`
font-size: 70px;
`
const Desc = styled.p`
margin: 4rem 0px;
font-size: 20px;
font-weight: 500;
letter-spacing: 3px;
`
const Button = styled.button`
padding: 0.8rem;
font-size: 20px;
background-color: transparent;
cursor: pointer;
&:hover{
  background-color: black;
  color: white;
}
`

const Slider = () => {
  const [slideIndex,setSlideIndex] = useState(0)
  const [banner,setBanner] = useState([])
  const handleClick = (direction) =>{
    
    if(direction === "left"){
      setSlideIndex(slideIndex>0 ?  slideIndex-1 : bannerLength-1)
    }else{
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  }



  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await publicRequest.get("/banner/findall");
        setBanner(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBanner();
  }, []);

    const bannerLength = (banner.filter((item)=>item.active===true)).length;

  useEffect(() => {
     const interval = setInterval(() => {
       handleClick("right");
     }, 5000);

     return () => {
       clearInterval(interval);
     };
   }, [slideIndex]);


  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <KeyboardArrowLeftIcon />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {banner?.map((item) => (
          item.active&&(
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>
                {item.desc}
              </Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
          )
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <KeyboardArrowRightIcon />
      </Arrow>
    </Container>
  );
}

export default Slider