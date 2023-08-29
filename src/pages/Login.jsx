import React,{useState} from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1380&t=st=1689672305~exp=1689672905~hmac=56d97e8e62807fd3b35e9c33bf537c34cea02a3600ec65e75daadd95228f559c");
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ backgroundSize: "cover" })}
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 1.3rem;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Form = styled.div`
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: 300;
  font-size: 1.5rem;
`;
const Input = styled.input`
  flex: 1;
  min-width: 85%;
  margin: 0.8rem 0rem;
  padding: 0.8rem;
`;
const Button = styled.button`
  width: 92%;
  border: none;
  padding: 1rem 1.3rem;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:disabled{
    color:black;
    cursor: not-allowed;
  }
`;
const Links = styled.a`
  margin: 0.8rem 0rem;
  font-size: 12px;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;


const Login = () => {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const dispatch  = useDispatch();
  const {isFetching, error} = useSelector((state)=>state.user)

  const handleClick = (e)=>{
    e.preventDefault();
    login(dispatch,{username,password})

  }

  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Links>CREATE A NEW ACCOUNT</Links>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login