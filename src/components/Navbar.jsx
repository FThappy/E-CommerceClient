import React, { useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {mobile} from "../responsive"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/userRedux";
import { removeProduct } from "../redux/cartRedux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";


const Container = styled.div`
  height: 4rem;
  
  ${mobile({
    height : "3.2rem"
  })}
`;
const Wrapper = styled.div`
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({
    padding: "0.5rem 0rem",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({
    display:"none",
  })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgrey;
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
  padding: 0.4rem;
  border : none;
`;

const Input = styled.input`
  border-radius: 2%;
  border: none;
  border-bottom: 2px solid #aaaaaa;
  ${mobile({ width: "3.2rem" })}
`;
const Logo = styled.h1`
  font-weight: bold;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({
    flex :2,
    justifyContent: "center",
  })}
`;

const MenuItem1 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 2rem;
  ${mobile({
    fontSize: "0.7rem",
    marginLeft: "0.5rem"
  })}
`;
const Button = styled.button`
  font-size: 1rem;
  cursor: pointer;
  color: teal;
  font-weight: 600;
  ${mobile({
    fontSize: "0.7rem",
    marginLeft: "0.5rem",
  })}
  background-color: white;
  border: none;
`;
const ImgUser = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-left: 2rem;
  cursor: pointer;
`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();
  const anchorRef = useRef(null);

  const cart = useSelector((state) => state.cart);
  const quantity = useSelector(state =>state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleLogOut = () => {
    dispatch(removeProduct(cart))
    dispatch(deleteUser(user))
    navigate("/");
  };
  const handleChange = (e)=>{
    setSearch(e.target.value)
  }
  console.log(search)
  const handleSearch = ()=>{
    navigate(`/products/item/${search}`)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>ENG</Language>
          <SearchContainer>
            <Input placeholder="Search....." onChange={handleChange}/>
            <SearchIcon style={{ color: "gray", fontSize: "16" ,cursor:"pointer"}} onClick={handleSearch}/>
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Logo>
              Bear
              <img
                src="https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png"
                alt="a"
                style={{ width: "5%" }}
              />
            </Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <MenuItem1>Product</MenuItem1>
          </Link>
          <Link to="/products/men" style={{ textDecoration: "none" }}>
            <MenuItem1>Men</MenuItem1>
          </Link>
          <Link to="/products/women" style={{ textDecoration: "none" }}>
            <MenuItem1>Women</MenuItem1>
          </Link>
          {!user && (
            <Link to="/register" style={{ textDecoration: "none" }}>
              <MenuItem1>Register</MenuItem1>
            </Link>
          )}
          {user ? (
            <>
              <ImgUser src={user.img} ref={anchorRef} onClick={handleToggle} />
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                sx={{ zIndex: 999 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                        >
                          <Link
                            to="/profile"
                            style={{ textDecoration: "none" }}
                          >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                          </Link>
                          <MenuItem onClick={handleClose}>
                            <Button onClick={handleLogOut}>LogOut</Button>
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <MenuItem1>SignIn</MenuItem1>
            </Link>
          )}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <MenuItem1>
              <Badge badgeContent={quantity} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </MenuItem1>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
