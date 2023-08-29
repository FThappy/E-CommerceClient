import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from "axios";



const Container = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  @media only screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Products = ({cat,filter,sort,search}) => {
  console.log(search)
  const [products,setProducts] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/product/findall?category=${cat}`
            : "http://localhost:5000/api/product/findall"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    getProducts();
  }, [cat]);

  useEffect(()=>{
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  },[products,cat,filter])

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : filteredProducts
            .slice(0, 16)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
}

export default Products