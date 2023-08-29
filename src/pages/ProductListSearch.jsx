import React, { useState } from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Announcenment from '../components/Announcenment'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import { mobile } from "../responsive";
import { useLocation } from 'react-router-dom'
import ProductSearch from '../components/ProductSearch'

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

const ProductListSearch = () => {

  const location = useLocation();
  const search = location.pathname.split("/")[3];
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
      <FilterContainer>
        <Filter>
          <FilterText>Filter Product:</FilterText>
          <Select defaultValue="1" name="color" onChange={handleFilter}>
            <Option disabled value="1">
              Color
            </Option>
            <Option value="white">White</Option>
            <Option value="black">Black</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
          </Select>
          <Select defaultValue="1" name="size" onChange={handleFilter}>
            <Option disabled value="1">
              Size
            </Option>
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products :</FilterText>
          <Select defaultValue="newest" onChange={(e) => setSort(e.target.value)}>
            <Option selected value="newest">
              Newest
            </Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <ProductSearch filter={filter} sort={sort} search={search} />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductListSearch