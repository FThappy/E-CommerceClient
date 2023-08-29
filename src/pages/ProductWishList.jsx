import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcenment from '../components/Announcenment'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom'
import ProductWishlist from '../components/ProductWishlist'

const Container = styled.div`
    
`
const Title = styled.h1`
    margin: 1.3rem;
`
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
`;
const Filter = styled.div`
  margin: 1.3rem;
  ${mobile({ width: "0rem 1.3rem", display: "flex", flexDirection: "column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 1.3rem;

`;
const Select = styled.select`
  padding: 0.7rem;
  margin-right: 1.3rem;
  ${mobile({ margin: "0.7rem 0rem" })}
`;
const Option = styled.option`
    
`

const ProductWishList = () => {

  const location = useLocation();
  const cat = location.pathname.split("/")[2]
  const [filter,setFilter] = useState({})

  const [sort,setSort] = useState("Newest")

  const handleFilter = (e) =>{

        const value  = e.target.value

        setFilter({
          ...filter,
          [e.target.name] : value
        })

  }

  console.log(filter)


  return (
    <Container>
      <Navbar />
      <Announcenment />
      <Title>Dresses</Title>
      <ProductWishlist />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductWishList