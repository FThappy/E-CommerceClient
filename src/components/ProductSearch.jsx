import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from "axios";
import { useSelector } from 'react-redux';



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

const ProductSearch = ({filter,sort,search}) => {
  console.log(search)
  const [products,setProducts] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const wishlist = useSelector((state) => state.wishlist.products);
  const isFetching = useSelector((state) => state.wishlist.isFetching);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          search
            ? `http://localhost:5000/api/product/searchs/?search=${search}`
            : "http://localhost:5000/api/product/findall"
        );
        
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [search]);

  console.log(products)
  
  useEffect(() => {
    const product = products.map((item) => {
      const newWishList = wishlist.find(
        (wishItem) => wishItem._id === item._id
      );
      if (newWishList) {
        return {
          ...item,
          wishlist: true,
        };
      }
      return item;
    });
    setProducts(product);
  }, [wishlist]);

  
  

  useEffect(()=>{
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  },[products,search,filter])

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
      {filteredProducts.map((item) => <Product item={item} key={item._id} />)}

    </Container>
  );
}

export default ProductSearch